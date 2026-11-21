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
  const sents=txt.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú])/).map(x=>x.trim()).filter(x=>x.length>=40&&x.length<=230&&!known.has(x)&&!/[{}=]/.test(x));
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
function catchUp(){const steps=Math.max(1,Math.min(300,Math.round((now-(S.last||now))/12000)));E.run(steps);return steps}

(async()=>{
 if(mode==='tick'){
  const steps=catchUp();
  const p=E.researchPlan();await research(p.s,p.tema,p.wiki,p.d,p.why);
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
