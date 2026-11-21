// Roda o mundo: MODE=tick (evolução periódica) ou MODE=message (mensagem de um visitante via issue).
const fs=require('fs'),path=require('path');
const M=require('../shared.js');
const file=process.argv[2]||'world.json';
const pagesUrl=process.env.PAGES_URL||'';
let S;try{S=JSON.parse(fs.readFileSync(file,'utf8'))}catch(e){S=M.newState();console.log('Mundo novo criado.')}
const E=M.Engine(S);
const now=Date.now(),mode=process.env.MODE||'tick';
const UA='MundoDosSlimes/1.0 (jogo educativo; GitHub Actions)';

async function wiki(q,s,d){
 const api='https://pt.wikipedia.org/w/api.php?format=json&';
 const get=async u=>{const r=await fetch(api+u,{headers:{'User-Agent':UA}});if(!r.ok)throw new Error('wiki '+r.status);return r.json()};
 const sr=await get('action=query&list=search&srlimit=3&srsearch='+encodeURIComponent(q));
 const known=new Set(s.facts.map(f=>f.f));
 for(const hit of (sr.query&&sr.query.search)||[]){
  const ex=await get('action=query&prop=extracts&exintro=1&explaintext=1&pageids='+hit.pageid);
  const pg=Object.values((ex.query&&ex.query.pages)||{})[0];if(!pg)continue;
  const txt=(pg.extract||'').replace(/\s+/g,' ');
  if(!M.safeText(pg.title))continue;
  const all=txt.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú])/).map(x=>x.trim()).filter(x=>x.length>=40&&x.length<=230&&!/[{}=]/.test(x));
  if(!all.length||all.filter(x=>!M.safeText(x)).length>all.length*.25)continue;
  const qw=new Set(M.words(q+' '+(d?M.DOMS[d].kw:'')));
  const rel=x=>M.words(x).some(w=>qw.has(w)||[...qw].some(y=>y.length>4&&w.startsWith(y.slice(0,5))));
  const sents=all.filter(x=>M.safeText(x)&&!known.has(x)&&rel(x));
  if(!sents.length)continue;
  if(!d){const h=M.detect(txt);d=Object.keys(h).sort((a,b)=>h[b]-h[a])[0]||M.profOf(s)||'ciencia'}
  const url='https://pt.wikipedia.org/wiki/'+encodeURIComponent(pg.title.replace(/ /g,'_'));
  return{reply:`Fui até a grande biblioteca da internet e li sobre “${pg.title}”!`,learn:sents.slice(0,3).map(f=>({dominio:d,fato:f,fonte:url})),web:true};
 }
 return null;
}
async function research(s,tema,wikiQ,d,why){
 let out=null;try{out=await wiki(wikiQ||tema,s,d)}catch(e){console.log('Wikipédia indisponível:',e.message)}
 if(!out)out=E.localResearch(s,tema);
 return E.learnResearch(s,tema,out,why);
}
function fbConfig(){try{const c=JSON.parse(fs.readFileSync(path.join(__dirname,'..','firebase-config.json'),'utf8'));return c&&c.projectId&&c.apiKey?c:null}catch(e){return null}}
async function fbMessages(){
 const c=fbConfig();if(!c)return 0;
 const since=S.fbLast||new Date(S.created).toISOString();
 const url=`https://firestore.googleapis.com/v1/projects/${c.projectId}/databases/(default)/documents:runQuery?key=${c.apiKey}`;
 const q={structuredQuery:{from:[{collectionId:'mensagens'}],where:{fieldFilter:{field:{fieldPath:'at'},op:'GREATER_THAN',value:{timestampValue:since}}},orderBy:[{field:{fieldPath:'at'},direction:'ASCENDING'}],limit:100}};
 const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});
 if(!r.ok){console.log('Firebase indisponível:',r.status,(await r.text()).slice(0,200));return 0}
 const rows=(await r.json()).filter(x=>x.document);let n=0;
 for(const row of rows){
  const f=row.document.fields||{},v=k=>f[k]?(f[k].stringValue??f[k].integerValue??f[k].timestampValue):undefined;
  const at=v('at');if(at)S.fbLast=at;
  const s=S.slimes.find(x=>x.id===+v('slime'))||S.slimes[0];
  const autor=String(v('autor')||'Visitante').replace(/[<>@]/g,'').trim().slice(0,24)||'Visitante';
  const texto=String(v('texto')||'').replace(/[<>]/g,'').trim().slice(0,400);if(!texto)continue;
  if(v('tipo')==='pesquisa'){const tema=texto.slice(0,80);await research(s,tema,tema,null,`a pedido de ${autor}`)}else E.talk(s,autor,texto);
  n++;
 }
 return n;
}
function catchUp(){const steps=Math.max(1,Math.min(1500,Math.round((now-(S.last||now))/12000)));E.run(steps);return steps}

(async()=>{
 if(mode==='tick'){
  const steps=catchUp();
  const nm=await fbMessages();if(nm)console.log(`Mensagens do Firebase: ${nm}.`);
  const qd=(S.queue||[]).splice(0,2);
  for(const it of qd){const s=S.slimes.find(x=>x.id===it.slime)||S.slimes[0];await research(s,it.tema,it.tema,null,'porque alguém perguntou no chat')}
  if(!qd.length){const p=E.researchPlan();await research(p.s,p.tema,p.wiki,p.d,p.why)}
  console.log(`Passos: ${steps}. Slimes: ${S.slimes.length}.`);
 }else if(mode==='message'){
  const ev=JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8'));
  const is=ev.issue||{},author=(is.user&&is.user.login||'alguém').slice(0,39),body=String(is.body||''),title=String(is.title||'');
  catchUp();
  const idm=body.match(/<!--\s*slime:(\d+)\s*-->/);
  let s=idm?S.slimes.find(x=>x.id===+idm[1]):null;
  if(!s){const n=title.match(/para\s+(.+)$/i);s=n?S.slimes.find(x=>x.name.toLowerCase()===n[1].trim().toLowerCase()):null}
  s=s||S.slimes[0];
  const text=body.replace(/<!--[\s\S]*?-->/g,'').replace(/\(não apague[^)]*\)/gi,'').replace(/[<>]/g,'').trim().slice(0,400);
  S.rate=S.rate||{};const hist=(S.rate[author]||[]).filter(t=>now-t<3600e3);
  let reply;
  if(hist.length>=10){reply=`${s.name} está cansado de tanto conversar com você hoje. Volte daqui a pouco!`}
  else if(!text){reply=`${s.name} não encontrou nenhuma mensagem. Escreva algo para ele!`}
  else if(/<!--\s*tipo:pesquisa\s*-->/.test(body)||/^pesquisa/i.test(title)){
   const tema=text.slice(0,80);const r=await research(s,tema,tema,null,`a pedido de ${author}`);
   reply=`${s.name} foi pesquisar sobre “${tema}” e aprendeu ${r.n} coisas novas (+${M.fmt(r.gain)} de conhecimento).\n\n${s.chat[s.chat.length-1].t.replace(/\n/g,'\n> ')}`;
  }else{const r=E.talk(s,author,text);reply=r.reply+(r.gain>0?`\n\n_+${M.fmt(r.gain)} de conhecimento para ${s.name}._`:'')}
  hist.push(now);S.rate[author]=hist;
  for(const k of Object.keys(S.rate))if(!S.rate[k].some(t=>now-t<3600e3))delete S.rate[k];
  fs.writeFileSync('reply.md',`**${s.name}** (nível ${M.level(s)}, ${M.profName(s)}) respondeu:\n\n> ${reply.replace(/\n/g,'\n> ')}\n\n${pagesUrl?`[Ver o Mundo dos Slimes](${pagesUrl})\n\n`:''}<sub>Esta conversa foi registrada no mundo e fechada automaticamente.</sub>\n`);
 }
 S.last=now;
 fs.mkdirSync(path.dirname(path.resolve(file)),{recursive:true});
 fs.writeFileSync(file,JSON.stringify(S));
})().catch(e=>{console.error(e);process.exit(1)});
