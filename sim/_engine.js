const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const MAXS=120;
function h2(x,y,s){let n=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(s,1442695041))|0;n=Math.imul(n^(n>>>13),1274126177);n^=n>>>16;return (n>>>0)/4294967296}
function vn(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);const a=h2(xi,yi,s),b=h2(xi+1,yi,s),c=h2(xi,yi+1,s),d=h2(xi+1,yi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
const fbm=(x,y,s)=>vn(x,y,s)*.65+vn(x*2.1,y*2.1,s+7)*.35;
const rx=y=>6+Math.round(Math.sin(y*.18)*2.5+Math.sin(y*.07+1)*3);
const ry=x=>9+Math.round(Math.sin(x*.15)*2+Math.sin(x*.05+2)*3);
const fmt=n=>n>=100?Math.floor(n).toString():n>=10?n.toFixed(0):n.toFixed(1).replace('.0','');
const total=s=>DK.reduce((a,d)=>a+(s.k[d]||0),0);
const level=s=>Math.floor(Math.sqrt(total(s)/4))+1;
function profOf(s){let best=null,bv=9.999;for(const d of DK)if((s.k[d]||0)>bv){bv=s.k[d];best=d}return best}
function profName(s){const d=profOf(s);if(!d)return'Explorador curioso';const v=s.k[d],p=DOMS[d].p;return v<30?'Aprendiz de '+p:v<80?p:'Mestre '+p}
function detect(text){const t=' '+norm(text)+' ';const hits={};for(const d of DK)for(const w of DOMS[d].kws)if(t.includes(w))hits[d]=(hits[d]||0)+1;return hits}
const pick=a=>a[Math.floor(Math.random()*a.length)];
// --- segurança: limpa dados pessoais e palavrões, e barra temas impróprios ---
const BAD=/\b(porra|caralh\w*|merda|puta\w*|foda\w*|fod[ea]r?|buceta|viad\w*|arrombad\w*|fdp|vtnc|pqp|cuzao|desgraçad\w*|otari\w*|idiota|imbecil|bost\w*)\b/gi;
function clean(t){return String(t||'')
 .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g,'[removido]')
 .replace(/\b(?:https?:\/\/|www\.)\S+/gi,'[removido]')
 .replace(/\b[\w-]+\.(?:com|net|org|br|io|me|gg|app|xyz)(?:\/\S*)?\b/gi,'[removido]')
 .replace(/(?:\+?\d[\d\s().-]{7,}\d)/g,'[removido]')
 .replace(/@\w{2,}/g,'[removido]')
 .replace(BAD,m=>m[0]+'*'.repeat(Math.max(2,m.length-1)))}
const UNSAFE=/(morte|morre|mort[oa]s?\b|matou|matar|acidente|nuclear|radia|reator|guerra|bomba|arma\b|armas|assassin|homic|suic|crime|criminos|drog|sexo|sexual|estupr|terror|violen|tortur|massacre|explos|cadaver|evacua|abuso|sequestr|genocid|nazis|escrav|pornogr|alcool|cigarr|tabaco|aposta|cassino|politic|eleic|partido|religi|resid(uo|uos)\b|caucas|etni|racia|racis|colonizad|imigra|escravi|ditadur|militar|soldad|sociedade|populacao|economi|imposto|dinheiro)/;
function safeText(t){return !UNSAFE.test(norm(t))}
const STOP=new Set('para como porque quando onde qual quais quanto quantos quem voce voces sobre isso essa esse esta este aqui tudo muito mais menos pode podem fazer sabe saber tem tinha uma umas uns dos das nos nas com sem por que ele ela eles elas meu minha seu sua sim nao entao tambem ainda'.split(' '));
const words=t=>norm(t).replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>3&&!STOP.has(w));
// --- relógio do mundo: um dia = 300 passos (1 hora real) e cada estação dura 7 dias ---
const DAYSTEPS=300,SEASONS=[{n:'Primavera',i:'🌸',fr:1.1,bug:1.3},{n:'Verão',i:'☀️',fr:1.25,bug:1.2},{n:'Outono',i:'🍂',fr:.8,bug:.9},{n:'Inverno',i:'❄️',fr:.35,bug:.35}];
function clock(steps){const st=(steps||0)+DAYSTEPS*8/24,day=Math.floor(st/DAYSTEPS)+1,hour=(st%DAYSTEPS)/DAYSTEPS*24,si=Math.floor((day-1)/7)%4;return{day,hour,si,season:SEASONS[si],night:hour<6||hour>=19,dayOfSeason:(day-1)%7+1}}

function newState(){
 const now=Date.now();
 const S={v:2,seed:(Math.random()*1e9)|0,created:now,last:now,bounds:{x0:-14,y0:-14,x1:14,y1:12},slimes:[],buildings:[],planted:[],res:{frutas:10,madeira:4},log:[],nextId:1,steps:0};
 for(const k in RES)S.res[k]=S.res[k]||0;
 const s={id:S.nextId++,name:'Azulim',hue:210,gen:1,k:{},facts:[],chat:[],home:null,x:0,y:1,nextSplit:25,born:now,topic:'',w:{},ok:0,err:0};
 s.chat.push({r:'s',t:'Oi! Eu sou o Azulim. Acabei de acordar nesta floresta… Tem tantas árvores e um barulhinho de cachoeira! Me ensina coisas?',at:now});
 S.slimes.push(s);S.log.unshift({t:'Azulim acordou na clareira da floresta.',at:now});
 return S;
}

async function wikiSearch(q,s,d,opt){
 opt=opt||{};const M={safeText,words,DOMS,DK,detect,profOf};
 const api='https://pt.wikipedia.org/w/api.php?format=json&origin=*&';
 const get=async u=>{const r=await fetch(api+u,opt.headers?{headers:opt.headers}:{});if(!r.ok)throw new Error('wiki '+r.status);return r.json()};
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
  const qOnly=new Set(M.words(q)),dk=new Set(M.DK.flatMap(k=>M.DOMS[k].kws));
  const hitW=(w,set)=>set.has(w)||[...set].some(y=>y.length>4&&w.startsWith(y.slice(0,5)));
  const rel=x=>{const ws=M.words(x);const nq=ws.filter(w=>hitW(w,qOnly)).length,nd=ws.filter(w=>hitW(w,dk)).length;return nq>=2||(nq>=1&&nd>=1)||(!qOnly.size&&nd>=2)};
  const sents=all.filter(x=>M.safeText(x)&&!known.has(x)&&rel(x));
  if(!sents.length)continue;
  if(!d){const h=M.detect(txt);d=Object.keys(h).sort((a,b)=>h[b]-h[a])[0]||M.profOf(s)||'ciencia'}
  const url='https://pt.wikipedia.org/wiki/'+encodeURIComponent(pg.title.replace(/ /g,'_'));
  return{title:pg.title,reply:`Fui até a grande biblioteca da internet e li sobre “${pg.title}”!`,learn:sents.slice(0,3).map(f=>({dominio:d,fato:f,fonte:url})),web:true};
 }
 return null;
}

function Engine(S){
 S.disc=S.disc||{};S.inv=S.inv||[];S.lib=S.lib||{};S.memorial=S.memorial||[];S.villages=S.villages||[];S.history=S.history||[];S.culture=S.culture||{songs:[],legends:[],fest:null};if(S.pol===undefined)S.pol=0;if(S.era===undefined)S.era=0;
 S.ideas=S.ideas||[];S.paths=S.paths||[];S.friends=S.friends||{};S.taught=S.taught||{};
 S.queue=S.queue||[];for(const x of S.slimes){const cap=Math.round(total(x)+40+S.slimes.length*3);if(!x.nextSplit||x.nextSplit>cap)x.nextSplit=cap}
 S.queue=S.queue||[];if(S.seasonIdx===undefined)S.seasonIdx=clock(S.steps).si;
 for(const x of S.slimes){x.facts=x.facts.filter(f=>safeText(f.f));x.chat=x.chat.filter(m=>m.r==='u'||safeText(m.t))}
 if(!S.privV1){S.privV1=1;// o chat público passa a guardar só o nome do visitante e um resumo curto
  S.ideasScanned=1;
  for(const x of S.slimes){x.chat=x.chat.filter(m=>m.pub||(m.r==='s'&&/(fonte: Wikipédia)|^Fui olhar pela floresta|^Oi! Eu sou/.test(m.t)));x.facts=x.facts.filter(f=>f.src||/^Lição/.test(f.f)||(ENC[f.d]||[]).includes(f.f)||/ ensinou como fazer /.test(f.f))}
  S.log=S.log.filter(l=>!/“[^”]*”\s*\((a pedido|porque alguém perguntou)/.test(l.t));S.queue=[];
 }
 S.bugs=S.bugs||[];S.threat=S.threat||0;S.alerta=S.alerta||0;if(S.pred===undefined)S.pred=null;S.bugId=S.bugId||1;S.res.insetos=S.res.insetos||0;
 const plantedSet=new Set(S.planted.map(p=>p[0]+','+p[1]));
 const tcache=new Map(),bAt=new Map();
 let fruitTrees=0,treeCount=0;
 function treeAt(x,y){const k=h2(x,y,S.seed+11);return{t:'T',kind:y<-10?(k<.2?'fruta':'pinho'):k<.32?'fruta':k<.72?'copa':'pinho',fc:FRUITC[Math.floor(k*1000)%4],sz:.85+h2(x,y,S.seed+5)*.35}}
 function baseTerrain(x,y){
  const s=S.seed,r0=Math.min(rx(y),rx(y+1)),r1=Math.max(rx(y),rx(y+1))+1,main=x>=r0&&x<=r1;
  if(y===-10||y===-9)return main?{t:'F'}:{t:'C'};
  const px=rx(-7)+.5;
  if(((x-px)/2.8)**2+((y+6.2)/1.7)**2<1)return{t:'W',pond:1};
  if(main)return{t:'W'};
  const a=ry(x),b=ry(x+1);
  if(y>=Math.min(a,b)&&y<=Math.max(a,b))return{t:'W'};
  const hv=h2(x,y,s+3);
  if(Math.hypot(x,y-1)<4.6)return{t:'G',fl:hv<.12};
  const n=fbm(x*.16,y*.16,s)+(y<-10?.16:0);
  if(n>.56||hv<.05)return treeAt(x,y);
  return{t:'G',fl:hv<.1,rk:y>-9&&y<-5&&hv>.92};
 }
 function T(x,y){const key=x+','+y;let t=tcache.get(key);if(!t){t=plantedSet.has(key)?treeAt(x,y):baseTerrain(x,y);tcache.set(key,t)}return t}
 const isWet=t=>t.t==='W'||t.t==='F';
 const pathSet=new Set((S.paths||[]).map(p=>p[0]+','+p[1]));
 function indexB(){bAt.clear();for(const b of S.buildings)bAt.set(b.x+','+b.y,b)}
 function inB(x,y){const b=S.bounds;return x>b.x0&&x<b.x1&&y>b.y0&&y<b.y1}
 function countTrees(){fruitTrees=0;treeCount=0;const b=S.bounds;for(let y=b.y0+1;y<b.y1;y++)for(let x=b.x0+1;x<b.x1;x++){const t=T(x,y);if(t.t==='T'){treeCount++;if(t.kind==='fruta')fruitTrees++}}}
 indexB();countTrees();
 function buildable(x,y){
  if(!inB(x,y)||T(x,y).t!=='G'||pathSet.has(x+','+y))return false;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const t=T(x+dx,y+dy);if(isWet(t)||t.t==='C')return false;if(bAt.has((x+dx)+','+(y+dy)))return false}
  return true;
 }
 function freeSpots(limit){let n=0;const b=S.bounds;for(let y=b.y0+1;y<b.y1;y++)for(let x=b.x0+1;x<b.x1;x++)if(buildable(x,y)&&++n>=limit)return n;return n}
 function findSpot(cx,cy){let best=null,bd=1e9;const b=S.bounds;for(let y=b.y0+1;y<b.y1;y++)for(let x=b.x0+1;x<b.x1;x++){if(!buildable(x,y))continue;const d=Math.hypot(x-cx,(y-cy)*1.2)+h2(x,y,S.seed+99)*1.5;if(d<bd){bd=d;best={x,y}}}return best}
 const home=s=>S.buildings.find(b=>b.id===s.home);
 const has=t=>S.buildings.some(b=>b.type===t);
 const cnt=t=>S.buildings.filter(b=>b.type===t).length;
 const add=(r,v)=>{S.res[r]=(S.res[r]||0)+v};
 function log(t){S.log.unshift({t,at:Date.now()});if(S.log.length>80)S.log.length=80}
 function pushChat(s,m){m.at=m.at||Date.now();s.chat.push(m);if(s.chat.length>20)s.chat=s.chat.slice(-20)}
 function addFact(s,d,f,src){if(s.facts.some(x=>x.f===f))return false;const o={d,f:String(f).slice(0,240)};if(src)o.src=src;s.facts.push(o);if(s.facts.length>40)s.facts.shift();return true}

 function gain(s,d,pts){
  if(!DOMS[d]||!(pts>0))return;
  const pn0=profName(s),l0=level(s);
  if(has('observatorio'))pts*=1.15;pts*=learnMult();
  s.k[d]=Math.round(((s.k[d]||0)+pts)*100)/100;
  if(profName(s)!==pn0)log(`${s.name} agora é ${profName(s)}!`);
  if(level(s)>l0)log(`${s.name} chegou ao nível ${level(s)}.`);
  if(total(s)>=s.nextSplit&&S.slimes.length<MAXS&&(S.steps||0)-(S.lastSplit??-1e9)>=4*S.slimes.length){S.lastSplit=S.steps||0;split(s)}
 }
 function split(s){
  s.nextSplit=Math.round(total(s)+40+S.slimes.length*3);
  const used=new Set(S.slimes.map(x=>x.name));
  let name=NAMES.find(n=>!used.has(n));if(!name){const suf=['do Riacho','da Colina','do Bosque','da Cachoeira','do Vale','da Lagoa','Júnior','Segundo'];for(const a of NAMES){for(const b of suf){if(!used.has(a+' '+b)){name=a+' '+b;break}}if(name)break}}name=name||('Slime '+S.nextId);
  const hue=Math.max(175,Math.min(290,s.hue+(Math.random()*50-25)));
  const c={id:S.nextId++,name,hue:Math.round(hue),gen:s.gen+1,k:{},facts:s.facts.slice(-3).map(f=>({...f})),chat:[],home:null,x:s.x+.6,y:s.y+.3,nextSplit:0,born:Date.now(),topic:'',w:{},ok:0,err:0};
  const inh=has('escola')?.3:.15,pm=profOf(s);for(const d of DK)if(s.k[d])c.k[d]=Math.round(s.k[d]*inh*(d===pm?.3:1)*10)/10;
  c.nextSplit=Math.round(total(c)+25);
  const cov=DK.map(d=>[d,S.slimes.filter(x=>profOf(x)===d).length]).sort((a,b)=>a[1]-b[1]||Math.random()-.5);c.w[cov[0][0]]=6;c.focus={d:cov[0][0],n:80};
  pushChat(c,{r:'s',t:`Oi! Eu nasci do ${s.name}! Lembro de umas coisinhas que ele sabia, mas quero aprender as minhas próprias. Acho que vou gostar de ${DOMS[cov[0][0]].n.toLowerCase()}!`});
  c.bornStep=S.steps||0;c.life=Math.round(DAYSTEPS*(96+Math.random()*48));libBoost(c);
  S.slimes.push(c);
  log(`${s.name} atingiu ${Math.floor(total(s))} de conhecimento e se dividiu! Nasceu ${name}.`);
 }
 const canAfford=c=>Object.entries(c).every(([r,v])=>(S.res[r]||0)>=v);
 function qualifies(s,type){const b=B[type];if(b.tot&&total(s)<b.tot)return false;if(b.minN&&S.slimes.length<b.minN)return false;if(b.tech&&!known(b.tech))return false;if(b.needs&&!(b.needs==='caminho'?S.paths.length>=20:has(b.needs)))return false;const f=S.taught[type]?.6:1;return Object.entries(b.req).every(([d,v])=>(s.k[d]||0)>=v*f)}
 const facLimit=()=>1+Math.floor(S.slimes.length/25);
 function build(s,type,by){
  const b=B[type];by=by||s;if(!qualifies(by,type)||!canAfford(b.cost))return false;
  let spot;
  if(b.home){const h=home(s);if(h&&B[h.type].lv>=b.lv)return false;if(b.lv>=4){const sorted=S.slimes.map(total).sort((x,y)=>y-x),rank=sorted.indexOf(total(s))/Math.max(1,sorted.length),cap=rank<.25?7:rank<.5?6:rank<.75?5:4;if(b.lv>cap)return false}if(h){spot={x:h.x,y:h.y};S.buildings=S.buildings.filter(x=>x!==h)}}
  else if(cnt(type)>=Math.min(facLimit(),(b.max??99)))return false;
  if(!spot){const hh=home(s);spot=findSpot(hh?hh.x:0,hh?hh.y+1:1);if(!spot)return false}
  for(const[r,v]of Object.entries(b.cost))S.res[r]-=v;
  const nb={id:S.nextId++,type,x:spot.x,y:spot.y,owner:s.id,at:Date.now()};
  S.buildings.push(nb);if(b.home)s.home=nb.id;indexB();
  log(by!==s?`${by.name} ajudou ${s.name} a construir: ${b.n}.`:`${s.name} construiu: ${b.n}.`);return true;
 }
 function autoBuild(){
  for(const s of S.slimes)if(!home(s)){const f=S.buildings.find(b=>b.free&&B[b.type].home);if(f){f.free=0;f.owner=s.id;s.home=f.id}}
  const builders=S.slimes.slice().sort((a,b)=>(b.k.construcao||0)-(a.k.construcao||0)).slice(0,3);
  const hl=s=>{const h=home(s);return h?B[h.type].lv:0};
  for(const s of S.slimes.slice().sort((a,b)=>hl(a)-hl(b))){const h=home(s);for(const t of Object.keys(B).filter(t=>B[t].home).sort((a,b)=>B[b].lv-B[a].lv)){if(h&&B[h.type].lv>=B[t].lv)break;if(build(s,t))return;for(const bd of builders)if(bd!==s&&build(s,t,bd))return}}
  if(S.slimes.some(s=>!s.home))return;
  for(const t of Object.keys(B)){if(B[t].home||cnt(t)>=Math.min(facLimit(),(B[t].max??99)))continue;const s=S.slimes.find(x=>qualifies(x,t));if(s&&build(s,t))return}
 }
 function plantTree(){
  if(S.event&&S.event.k==='poluicao')return false;const b=S.bounds;if(treeCount>(b.x1-b.x0-1)*(b.y1-b.y0-1)*.3)return false;
  for(let i=0;i<60;i++){
   const x=b.x0+1+Math.floor(Math.random()*(b.x1-b.x0-1)),y=b.y0+1+Math.floor(Math.random()*(b.y1-b.y0-1));
   if(T(x,y).t!=='G'||Math.hypot(x,y-1)<5)continue;
   if(S.buildings.some(bb=>Math.abs(bb.x-x)<=2&&Math.abs(bb.y-y)<=2))continue;
   let tr=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(T(x+dx,y+dy).t==='T')tr++;
   if(tr<2)continue;
   S.planted.push([x,y]);plantedSet.add(x+','+y);tcache.delete(x+','+y);countTrees();return true;
  }
  return false;
 }
 function checkExpand(){
  const n=S.slimes.length,b=S.bounds,w=b.x1-b.x0,h=b.y1-b.y0;
  // o mundo se alarga para os lados conforme a população cresce (e um pouco para cima e para baixo)
  const tw=Math.min(240,30+Math.round(n*.9)),th=Math.min(120,26+Math.round(n*.5));
  let grew=false;
  if(w<tw){b.x0-=2;b.x1+=2;grew=true}
  if(h<th&&S.steps%9===0){b.y0-=1;b.y1+=1;grew=true}
  const want=has('ponte')?8+n*1.3:4+n;
  if(!grew&&freeSpots(want)<want&&w<240){b.x0-=3;b.x1+=3;b.y0-=1;b.y1+=1;grew=true}
  if(grew){countTrees();if(!S.lastGrowLog||S.steps-S.lastGrowLog>150){S.lastGrowLog=S.steps;log('O mundo cresceu! Novas áreas de floresta foram descobertas nas laterais.')}}
 }
 function needs(){
  const n=S.slimes.length,r=S.res,nd={};for(const d of DK)nd[d]=0;
  if(r.frutas+(r.insetos||0)+r.refeicoes*2<n*6)nd.natureza+=2;
  if(r.madeira<15)nd.carpintaria+=1.5;
  if(r.pedra<12)nd.pedra+=1;
  if(r.agua<10)nd.agua+=.8;
  if(r.frutas>20&&r.refeicoes<n*2)nd.culinaria+=.8;
  if(S.slimes.some(x=>{const h=home(x);return!h||B[h.type].lv<2}))nd.construcao+=1;
  {const ck=clock(S.steps);if(ck.si===2){nd.culinaria+=1.5;nd.natureza+=.5}if(ck.si===3&&r.frutas+r.refeicoes<n*8)nd.culinaria+=1}
  if(S.threat>0)nd.defesa+=Math.min(3,S.threat);if(S.pred)nd.defesa+=2;
  if(n>=3){const cov=new Set(S.slimes.map(profOf));for(const d of DK)if(!cov.has(d))nd[d]+=1}
  return nd;
 }
 function chooseDomain(s,nd){
  if(s.focus&&s.focus.n>0){s.focus.n--;if(!s.focus.n)delete s.focus;return s.focus?s.focus.d:chooseDomain(s,nd)}
  const p=profOf(s);if(p){const crowd=S.slimes.filter(x=>profOf(x)===p).length>S.slimes.length/5;if(Math.random()>(crowd?.35:.12))return p}
  let tot=0;const ws=DK.map(d=>{const w=(s.w[d]||1)*(1+nd[d]);tot+=w;return w});
  let x=Math.random()*tot;for(let i=0;i<DK.length;i++){x-=ws[i];if(x<=0)return DK[i]}return DK[0];
 }
 function spotFor(s,want){
  const h=home(s),cx=h?h.x:0,cy=h?h.y+1:1;
  if(B[want]){const b=S.buildings.find(x=>x.type===want);if(b)return{x:b.x+.1,y:b.y+.9}}
  if(want==='casa'||want==='cozinha'||want==='biblioteca'||want==='atelie')return{x:cx+(Math.random()*3-1.5),y:cy+(Math.random()*2-1)};
  for(let i=0;i<50;i++){const r=3+i*.15,x=Math.round(cx+(Math.random()*2-1)*r),y=Math.round(cy+(Math.random()*2-1)*r);const t=T(x,y);
   const ok=want==='fruta'?(t.t==='T'&&t.kind==='fruta'):want==='W'?t.t==='W':want==='C'?t.t==='C':t.t==='T';
   if(!ok)continue;for(const[dx,dy]of[[0,1],[1,0],[-1,0],[0,-1]]){const n=T(x+dx,y+dy);if(n.t==='G'&&inB(x+dx,y+dy))return{x:x+dx,y:y+dy}}}
  return{x:cx+(Math.random()*4-2),y:cy+(Math.random()*3-1.5)};
 }
 function doTask(s,nd,last){
  const d=chooseDomain(s,nd);s.w[d]=s.w[d]||1;
  if(last){const sp=spotFor(s,TASK[d].spot);s.x=Math.round(sp.x*100)/100;s.y=Math.round(sp.y*100)/100;s.task=d}
  const sk=s.k[d]||0,r=(1+sk/40)*techMult(d),mult=has('biblioteca')?1.25:1;
  if(d==='culinaria'&&S.res.frutas<1&&S.res.insetos<1){s.w[d]=Math.max(.2,s.w[d]-.3);return}
  let p=.3+.62*sk/(sk+25)+Math.min(.08,(S.res.ferramentas||0)*.004)-((S.res.frutas+S.res.refeicoes+S.res.insetos)<=.01?.12:0);
  if(d==='saude'||d==='ciencia'||d==='arte')p+=.05;
  if(Math.random()<p){
   let txt='';const hz=has('horta')?1.3:1;
   if(d==='natureza'){const v=2.5*r*hz;add('frutas',v);add('mudas',.3);txt=`+${fmt(v)} frutas`}
   else if(d==='construcao'){const v=1.2*r;add('tijolos',v);txt=`+${fmt(v)} tijolos`}
   else if(d==='carpintaria'){if(has('oficina')&&S.res.madeira>=4&&Math.random()<.4){S.res.madeira-=3;add('ferramentas',1);txt='fiz uma ferramenta!'}else{const v=2*r;add('madeira',v);txt=`+${fmt(v)} madeira`}}
   else if(d==='pedra'){const v=1.6*r;add('pedra',v);txt=`+${fmt(v)} pedras`}
   else if(d==='culinaria'){const fr=S.res.frutas>=1,f=Math.min(fr?S.res.frutas:S.res.insetos,2);if(fr)S.res.frutas-=f;else S.res.insetos-=f;const v=f*(has('cozinha')?2:1.3)*(has('moinho')?1.5:1)*Math.min(2,r);add('refeicoes',v);txt=fr?`+${fmt(v)} refeições`:`espetinho de inseto! +${fmt(v)} refeições`}
   else if(d==='ciencia'){const o=S.slimes.filter(x=>x!==s);if(o.length){const t=pick(o);gain(t,profOf(t)||'ciencia',.35*mult);txt=`ensinei algo a ${t.name}!`}else{gain(s,'ciencia',.2);txt='descobri algo!'}}
   else if(d==='arte'){const v=.7*r*(has('atelie')?2:1);add('arte',v);txt=`+${fmt(v)} arte`}
   else if(d==='saude'){if(has('enfermaria')&&S.res.ervas>=2&&Math.random()<.5){S.res.ervas-=2;add('remedios',1);txt='fiz um remédio!'}else{const v=1.3*r;add('ervas',v);txt=`+${fmt(v)} ervas`}}
   else if(d==='defesa'){const v=1*r;S.alerta=Math.min(30,S.alerta+v);if(S.pred){S.pred.hp-=.5;txt='ajudei a espantar o bicho!'}else txt='ronda feita, tudo seguro'}
   else if(d==='agua'){const v=2.5*r*(has('fonte')?1.5:1);add('agua',v);txt=`+${fmt(v)} água`}
   s.ok++;s.w[d]+=.5;gain(s,d,.15*mult);
   if(last)s.say='Consegui! '+txt;
  }else{
   const f=pick(TASK[d].f);
   s.err++;s.w[d]=Math.max(.2,s.w[d]-.2);s.lastFail=d;gain(s,d,.25*mult);
   if(last)s.say='Ops… '+f[0]+'.';
   if(Math.random()<.5&&addFact(s,d,'Lição: '+f[1]))log(`${s.name} errou (“${f[0]}”) e aprendeu: ${f[1]}`);
  }
  for(const k in s.w)s.w[k]=Math.round(s.w[k]*100)/100;
 }
 function spawnBugs(){
  for(let r=0;r<1+Math.floor(S.slimes.length/15);r++)spawnBug(r===0);
 }
 function spawnBug(first){
  const n=S.slimes.length,cap=Math.min(60,4+Math.floor(n/2)+Math.floor(treeCount/40));
  if(first){for(const b of S.bugs)b.age++;S.bugs=S.bugs.filter(b=>b.age<60)}
  const ck=clock(S.steps);
  if(S.bugs.length>=cap*Math.min(1,ck.season.bug)||Math.random()>.45*ck.season.bug)return;
  const bw=q=>BUGS[q].w*(BUGS[q].fly?(ck.night?3:.6):(ck.night?.5:1));
  let tw=0;for(const k in BUGS)tw+=bw(k);let x0=Math.random()*tw,k='grilo';for(const q in BUGS){x0-=bw(q);if(x0<=0){k=q;break}}
  const bb=S.bounds;
  for(let i=0;i<40;i++){
   const x=bb.x0+1+Math.floor(Math.random()*(bb.x1-bb.x0-1)),y=bb.y0+1+Math.floor(Math.random()*(bb.y1-bb.y0-1));
   if(T(x,y).t!=='G'||bAt.has(x+','+y))continue;
   let ok=false;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1]]){const t=T(x+dx,y+dy);if(BUGS[k].water?(t.t==='W'):(t.t==='T')){ok=true;break}}
   if(!ok)continue;
   S.bugs.push({id:S.bugId++,k,x:Math.round((x+Math.random()*.6-.3)*100)/100,y:Math.round((y+Math.random()*.6-.3)*100)/100,age:0});return;
  }
 }
 function hunt(s,last){
  const h=home(s),cx=h?h.x:s.x,cy=h?h.y:s.y;
  let bug=null,bd=1e9;for(const b of S.bugs){const d=Math.hypot(b.x-cx,b.y-cy)+Math.random()*6;if(d<bd){bd=d;bug=b}}
  if(!bug)return false;
  const K=BUGS[bug.k],sk=s.k.natureza||0,mult=has('biblioteca')?1.25:1;
  if(last){s.x=Math.round((bug.x-.4)*100)/100;s.y=bug.y;s.task='caca'}
  const p=Math.max(.12,Math.min(.92,.32+.55*sk/(sk+20)-K.ag*.6+level(s)*.01));
  if(Math.random()<p){
   S.bugs.splice(S.bugs.indexOf(bug),1);
   const v=K.food*(1+Math.min(1,sk/80));add('insetos',v);
   s.ok++;s.caught=(s.caught||0)+1;gain(s,'natureza',.12*mult);
   if(last)s.say=`Peguei um ${K.n}! +${fmt(v)} de comida`;
   if(s.caught===1||s.caught%15===0)log(s.caught===1?`${s.name} caçou o primeiro inseto: um ${K.n}!`:`${s.name} já caçou ${s.caught} insetos.`);
  }else{
   bug.x=Math.round((bug.x+Math.random()*2-1)*100)/100;bug.y=Math.round((bug.y+Math.random()*2-1)*100)/100;
   s.err++;gain(s,'natureza',.2*mult);
   if(last)s.say='Ops… '+K.f[0]+'.';
   if(Math.random()<.5&&addFact(s,'natureza','Lição: '+K.f[1]))log(`${s.name} errou (“${K.f[0]}”) e aprendeu: ${K.f[1]}`);
  }
  return true;
 }
 function predEdge(){
  const b=S.bounds;
  for(let i=0;i<40;i++){const side=Math.floor(Math.random()*4);let x,y;
   if(side<2){x=side?b.x1-1:b.x0+1;y=b.y0+1+Math.floor(Math.random()*(b.y1-b.y0-1))}else{y=side===2?b.y0+1:b.y1-1;x=b.x0+1+Math.floor(Math.random()*(b.x1-b.x0-1))}
   const t=T(x,y);if(t.t==='G'||t.t==='T')return{x,y}}
  return null;
 }
 function predSpawn(){
  const n=S.slimes.length;
  const nt=clock(S.steps).night;let ch=.0025*(1+Math.min(n,24)/12)*(nt?1.8:.6);if(has('fogueira'))ch*=nt?.4:.7;if(has('farol')&&nt)ch*=.5;
  if(Math.random()>ch)return;
  const ks=Object.keys(PRED).filter(k=>n>=PRED[k].minN);let tw=0;for(const k of ks)tw+=PRED[k].w;let x=Math.random()*tw,k=ks[0];for(const q of ks){x-=PRED[q].w;if(x<=0){k=q;break}}
  const e=predEdge();if(!e)return;
  S.pred={k,x:e.x,y:e.y,age:0,hp:PRED[k].hp};
  log(has('torre')?`A torre de vigia avistou ${PRED[k].art} ${PRED[k].n} chegando! Todos em alerta.`:`${PRED[k].art[0].toUpperCase()+PRED[k].art.slice(1)} ${PRED[k].n} apareceu na beira da floresta…`);
 }
 function predStep(last){
  const P=S.pred,K=PRED[P.k];P.age++;
  const h=S.buildings.length?S.buildings[Math.floor(Math.random()*S.buildings.length)]:{x:0,y:1};
  const dx=h.x-P.x,dy=h.y-P.y,d=Math.hypot(dx,dy)||1,m=Math.min(d,1.5);P.x=Math.round((P.x+dx/d*m)*100)/100;P.y=Math.round((P.y+dy/d*m)*100)/100;
  const torre=has('torre'),fog=has('fogueira'),cer=cnt('cerca');
  const free=S.slimes.filter(s=>!(s.scared>0)).sort((a,b)=>(b.k.defesa||0)-(a.k.defesa||0));
  const defs=free.filter((s,i)=>profOf(s)==='defesa'||i<1||Math.random()<(torre?.55:.25)).slice(0,torre?5:3);
  const mult=has('biblioteca')?1.25:1;
  for(const s of defs){
   const sk=s.k.defesa||0;
   const p=Math.max(.08,Math.min(.9,.15+.6*sk/(sk+20)+(cer?.06+.03*Math.min(3,cer):0)+(fog?.1:0)+(torre?.05:0)+S.alerta*.004-K.str*.01));
   if(last){s.x=Math.round((P.x+(Math.random()*2-1))*100)/100;s.y=Math.round((P.y+(Math.random()*1.4-.7))*100)/100;s.task='defesa'}
   if(Math.random()<p){P.hp-=1+sk/25;gain(s,'defesa',.25*mult);s.ok++;if(last)s.say=pick(['Xô, xô! Vai embora!','Fiquem atrás de mim!','Aqui não, bicho!'])}
   else{gain(s,'defesa',.35*mult);s.err++;if(last)s.say='Ops… '+K.f[0]+'.';if(Math.random()<.5&&addFact(s,'defesa','Lição: '+K.f[1]))log(`${s.name} errou (“${K.f[0]}”) e aprendeu: ${K.f[1]}`)}
   if(P.hp<=0){
    for(const x of defs)gain(x,'defesa',.6*mult);
    log(`${defs.map(x=>x.name).slice(0,3).join(', ')}${defs.length>3?' e outros':''} espantaram ${K.art} ${K.n}! ${K.ele} voltou para o fundo da floresta.`);
    S.threat=Math.max(0,S.threat-.5);S.pred=null;return defs;
   }
  }
  if(P.age<(torre?7:5))return defs;
  // ataque
  const prot=Math.min(.75,(cer?.3+.1*Math.min(3,cer-1):0)+(fog?.1:0));
  const lost=[];
  for(const r of K.leva){const v=(S.res[r]||0)*K.perda*(1-prot);if(v>=.5){S.res[r]-=v;lost.push(`${fmt(v)} de ${RES[r].toLowerCase()}`)}}
  const nScare=Math.max(0,Math.round(K.medo*(1-prot)));const sc=[];
  for(let i=0;i<nScare&&i<free.length;i++){const s=pick(free);if(!(s.scared>0)){s.scared=12;sc.push(s.name);if(last)s.say='Que medo! Vou ficar quietinho um pouco…'}}
  for(const s of S.slimes){gain(s,'defesa',.8*mult);addFact(s,'defesa','Lição: '+K.f[1])}
  S.threat=Math.min(6,S.threat+1.5+K.medo*.5);
  log(`${K.art[0].toUpperCase()+K.art.slice(1)} ${K.n} atacou a vila${lost.length?' e levou '+lost.join(', '):''}${sc.length?'. Ficaram assustados: '+sc.join(', '):''}${prot?' (as proteções ajudaram)':''}. Ninguém se machucou, e todos aprenderam a se defender melhor.`);
  S.pred=null;return defs;
 }
 function upgrade(){
  const cand=S.buildings.filter(b=>B[b.type]&&!B[b.type].home&&b.type!=='custom'&&(b.nv||1)<5);if(!cand.length)return;
  const b=pick(cand),T0=B[b.type],nv=b.nv||1,cost={};for(const[r,v]of Object.entries(T0.cost))cost[r]=Math.round(v*Math.pow(2,nv)*1.5);
  if(!canAfford(cost))return;
  const s=S.slimes.find(x=>Object.entries(T0.req).every(([d,v])=>(x.k[d]||0)>=v*(1+nv*.6)));if(!s)return;
  for(const[r,v]of Object.entries(cost))S.res[r]-=v;b.nv=nv+1;
  log(`${s.name} melhorou ${T0.n} para o nível ${b.nv}.`);
 }
 function market(){
  const ks=['madeira','pedra','tijolos','ervas','agua'],need={madeira:1,pedra:1,tijolos:.8,ervas:.5,agua:.8};
  const sc=ks.map(k=>[k,(S.res[k]||0)/need[k]]).sort((a,b)=>a[1]-b[1]);const lo=sc[0],hi=sc[sc.length-1];
  if(hi[1]>lo[1]*3&&hi[1]>50){const v=(S.res[hi[0]]||0)*.04;S.res[hi[0]]-=v;add(lo[0],v*.8*need[lo[0]]/need[hi[0]])}
 }
 const vbonus=()=>Math.min(.8,S.buildings.reduce((a,b)=>a+((b.nv||1)-1)*.01+(b.type==='custom'?.01:0)+(b.type==='estabulo'?.02*(b.nv||1):0)+(b.type==='garagem'?.03*(b.nv||1):0),0)+(S.paths.length>=20?.05:0));
 // ---- construções inventadas a partir da conversa ----
 function ideaFrom(text){
  const t=norm(text).replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ');
  const sing=w=>w.length>4&&w.endsWith('s')?w.slice(0,-1):w;
  const cap=x=>x.charAt(0).toUpperCase()+x.slice(1);
  const orig=ws=>{let nome=ws.join(' ');const ow=String(text).split(/\s+/).map(w=>w.replace(/[^\p{L}\p{N}-]/gu,'')).filter(Boolean),nw=ow.map(w=>norm(w));for(let i=0;i<=nw.length-ws.length;i++){if(ws.every((w,j)=>nw[i+j]===w)){nome=ow.slice(i,i+ws.length).join(' ').toLowerCase();break}}return nome};
  const known=ws=>{const w0=sing(ws[0]);for(const[k,b]of Object.entries(B)){if(k==='custom')continue;const bn=norm(b.n).split(' ').map(sing);if(bn.includes(w0)||(b.kw&&b.kw.split(' ').map(sing).includes(w0))||k===w0)return{type:k,nome:b.n}}if(/^(casa|predio|edificio|cabana)$/.test(w0))return{type:w0==='predio'||w0==='edificio'?'predio':'cabana',nome:w0};return null};
  // ruas e caminhos são reconhecidos mesmo sem verbo
  const pm=t.match(/\b((?:ruas?|caminhos?|calcadas?|estradas?|trilhas?|passarelas?)(?: e (?:ruas?|caminhos?|calcadas?|estradas?|trilhas?))?(?: de (?:pedra|pedras|tijolo|tijolos|madeira|terra))?)\b/);
  if(pm&&/(caminh|rua|calcad|estrad|trilh|passarel)/.test(pm[1])){const ws=pm[1].split(' ');if(!S.ideas.some(i=>i.kind==='caminho'))return{kind:'caminho',nome:cap(orig(ws))}}
  const stop=new Set('para que com e na no nas nos perto ao em porque pra pois aqui ali la entre sobre ate onde quando se mas muito bem bonito bonita grande pequeno pequena alto alta'.split(' '));
  const bad=new Set('tijolo tijolos madeira pedra pedras comida agua equipe equipes espaco espacos coisa coisas tudo algo isso isto melhor melhores amigos amigo voce voces ele ela parte trabalho tarefa sobre mais novo nova uns umas'.split(' '));
  const re=/\b(construir|construam|construa|construindo|fazer|facam|faca|criar|criem|crie|montar|montem|erguer|ergam|levantar|inventar)\s+((?:(?:um|uma|uns|umas|o|a|os|as|mais|novos?|novas?|pequenos?|pequenas?|grandes?)\s+)*)([a-z0-9 ]{3,60})/g;
  let m,fallback=null;
  while((m=re.exec(t))){
   const ws=[];for(const w of m[3].trim().split(/\s+/)){if(stop.has(w))break;ws.push(w);if(ws.length>=4)break}
   while(ws.length&&['de','da','do','das','dos'].includes(ws[ws.length-1]))ws.pop();
   if(!ws.length||ws.join('').length<3||bad.has(ws[0]))continue;
   const nome=orig(ws);if(!safeText(nome))continue;
   const k=known(ws);if(k)return k;
   const kind=IDEAK.find(([k2,re2])=>re2.test(nome))[0];
   if(kind!=='generico')return{kind,nome:cap(nome)};
   if(!fallback)fallback={kind,nome:cap(nome)};
  }
  return fallback;
 }
 let lastIdea=null;
 function teachIdea(s,author,text){
  const id=ideaFrom(text);if(!id)return null;lastIdea=id.type?B[id.type].n:id.nome;
  if(id.type){S.taught[id.type]=1;addFact(s,'construcao',`${author} ensinou como fazer ${B[id.type].n.toLowerCase()}.`);
   const done=has(id.type);return done?`A gente já tem ${B[id.type].n.toLowerCase()} aqui! Mas com o que você contou vou fazer ainda melhor.`:`${B[id.type].n}! Eu já tinha ouvido falar… Com a sua explicação vai ficar mais fácil aprender a construir. Quando eu souber o bastante, vou fazer!`}
  if(S.ideas.some(i=>norm(i.nome)===norm(id.nome))){const i=S.ideas.find(i=>norm(i.nome)===norm(id.nome));i.prog=(i.prog||0)+3;return i.done?`${i.nome}? Já sei fazer! Vou fazer mais um quando sobrar material.`:`Estou praticando ${i.nome.toLowerCase()}! Com essa dica avancei mais um pouco.`}
  if(S.ideas.length>=24)S.ideas.shift();
  S.ideas.push({id:S.nextId++,nome:id.nome,kind:id.kind,prog:2,done:false,by:s.id,autor:author});
  log(`${author} ensinou ${s.name} a ideia de construir: ${id.nome.toLowerCase()}.`);
  return pick([`Uau, ${id.nome.toLowerCase()}! Nunca construí isso. Vou juntar material, treinar com os construtores e tentar fazer!`,`Que ideia boa! ${id.nome}… Já estou imaginando como vai ficar. Vou começar a praticar agora mesmo!`,`Ninguém aqui sabia fazer ${id.nome.toLowerCase()}. Vou ser o primeiro a tentar! Depois você vem ver?`]);
 }
 function makePaths(limit){
  const hub=S.buildings.find(b=>b.type==='praca')||S.buildings[0];if(!hub)return 0;
  let add=0;const put=(x,y)=>{const k=x+','+y;if(pathSet.has(k)||bAt.has(k)||!inB(x,y))return;const t=T(x,y);if(t.t!=='G')return;pathSet.add(k);S.paths.push([x,y]);add++};
  const tg=S.buildings.filter(b=>b.type!=='ninho').sort((a,b)=>Math.hypot(a.x-hub.x,a.y-hub.y)-Math.hypot(b.x-hub.x,b.y-hub.y));
  for(const b of tg){if(pathSet.has(b.x+','+(b.y+1)))continue;let x=hub.x,y=hub.y+1;const tx=b.x,ty=b.y+1;while(x!==tx){x+=Math.sign(tx-x);put(x,y)}while(y!==ty){y+=Math.sign(ty-y);put(x,y)}if(add>=limit)break}
  return add;
 }
 function workIdeas(){
  for(const i of S.ideas){
   const b=S.slimes.slice().sort((a,c)=>(c.k.construcao||0)-(a.k.construcao||0))[0];if(!b)return;
   const sk=b.k.construcao||0;
   if(!i.done){i.prog=Math.round(((i.prog||0)+.5+sk/200)*100)/100;
    if(i.prog>=12){const cost={madeira:20,pedra:25};if(!canAfford(cost))continue;for(const[r,v]of Object.entries(cost))S.res[r]-=v;i.done=true;
     if(i.kind==='caminho'){makePaths(60);log(`${b.name} aprendeu a fazer ${i.nome.toLowerCase()} (ideia de ${i.autor}) e começou a ligar as casas da vila!`)}
     else{const sp=findSpot(0,1);if(sp){S.buildings.push({id:S.nextId++,type:'custom',kind:i.kind,nome:i.nome,x:sp.x,y:sp.y,owner:b.id,at:Date.now()});indexB()}log(`${b.name} aprendeu a construir ${i.nome.toLowerCase()} (ideia de ${i.autor}) e fez o primeiro!`)}
     addFact(b,'construcao',`Aprendi a fazer ${i.nome.toLowerCase()}.`);gain(b,'construcao',3);}
   }else if(i.kind==='caminho'){makePaths(8)}
   else if(Math.random()<.15&&S.buildings.filter(x=>x.type==='custom'&&x.nome===i.nome).length<1+Math.floor(S.slimes.length/20)&&canAfford({madeira:30,pedra:30})){const sp=findSpot((Math.random()*2-1)*S.slimes.length,1);if(sp){S.res.madeira-=30;S.res.pedra-=30;S.buildings.push({id:S.nextId++,type:'custom',kind:i.kind,nome:i.nome,x:sp.x,y:sp.y,owner:b.id,at:Date.now()});indexB();log(`${b.name} construiu mais um(a) ${i.nome.toLowerCase()}.`)}}
  }
 }
 // =================== CIVILIZAÇÃO ===================
 const COSTM=8;
 const day=()=>clock(S.steps).day;
 const yearOf=d=>Math.floor((d-1)/28)+1;
 function hist(t){S.history.unshift({d:day(),t});if(S.history.length>300)S.history.length=300}
 const known=id=>!!S.disc[id];
 function grant(id){if(!DISC[id]||S.disc[id])return;for(const r of DISC[id][2])grant(r);S.disc[id]=day()}
 const dcost=id=>Math.round(DISC[id][4]*COSTM*(1+DISC[id][1]*1.2));
 const invCost=()=>Math.round(250000*Math.pow(1.1,S.invN||0));
 function eraName(i){if(i<ERAS.length)return ERAS[i];const k=i-ERAS.length;return k===0?'Era Estelar':k===1?'Era Galáctica':'Era Cósmica '+(k-1)}
 const eraIcon=i=>i<ERAI.length?ERAI[i]:'🌌';
 function calcEra(){
  let e=0;for(let i=0;i<ERAS.length;i++){const ids=Object.keys(DISC).filter(k=>DISC[k][1]===i);const kn=ids.filter(known).length;if(kn>=Math.ceil(ids.length*.6))e=i;else break}
  if(Object.keys(DISC).every(known))e=ERAS.length-1+1+Math.floor((S.invN||0)/10);
  return e;
 }
 function available(){return Object.keys(DISC).filter(k=>!known(k)&&DISC[k][2].every(known))}
 function pickTarget(){
  const av=available();
  if(S.event&&!S.event.soft&&EVENTS[S.event.k]&&av.includes(EVENTS[S.event.k].sol))return EVENTS[S.event.k].sol;
  if(!av.length)return Object.keys(DISC).every(known)?'inv':null;
  av.sort((a,b)=>dcost(a)-dcost(b));return pick(av.slice(0,2));
 }
 const TM={natureza:['coleta','agricultura','irrigacao','moinho_agua','cidade_verde'],construcao:['tijolo','engenharia'],culinaria:['fogo','ceramica'],saude:['ervas_med','saneamento','vacinas'],arte:['musica'],agua:['barco','moinho_agua'],carpintaria:['roda','motor'],pedra:['roda','metalurgia'],ciencia:['escrita','imprensa','computador'],defesa:['fogo','metalurgia']};
 function techMult(d){let m=1;for(const id of TM[d]||[])if(known(id))m+=.15;m*=eventMult(d);return m}
 function techAll(){let m=1;for(const id of ['ferramentas','metalurgia','robos','eletricidade'])if(known(id))m+=.05;m+=.25*Math.log2(1+(S.invN||0));return m}
 const learnMult=()=>1+['escrita','imprensa','computador','internet'].filter(known).length*.08;
 function eventMult(d){
  const e=S.event&&EVENTS[S.event.k]?S.event.k:null;if(!e)return 1;const m=eventRaw(e,d);return S.event.soft?1-(1-m)*.3:m;
 }
 function eventRaw(e,d){
  if(e==='seca')return d==='agua'||d==='natureza'?.5:1;
  if(e==='praga')return d==='natureza'?.4:1;
  if(e==='enchente')return .75;
  if(e==='doenca')return .7;
  if(e==='poluicao')return d==='natureza'?.6:.9;
  if(e==='apagao')return .8;
  if(e==='tempestade')return .8;
  if(e==='chuva_meteoros')return .85;
  return 1;
 }
 function rpGain(){
  const n=S.slimes.length;let base=n*.05;for(const s of S.slimes)base+=(s.k.ciencia||0)/500;
  for(const v of S.villages)base+=v.pop*.02;
  const m=1+.2*has('biblioteca')+.2*has('observatorio')+.2*known('escrita')+.3*known('imprensa')+.5*known('computador')+.5*has('antena')+.05*S.villages.length+(S.event&&S.event.k==='apagao'?-.3:0);
  return base*m;
 }
 function research(){
  if(!S.cur||(S.cur!=='inv'&&known(S.cur)))S.cur=pickTarget();
  if(S.event&&EVENTS[S.event.k]&&!known(EVENTS[S.event.k].sol)&&available().includes(EVENTS[S.event.k].sol))S.cur=EVENTS[S.event.k].sol;
  if(!S.cur)return;
  S.rp=(S.rp||0)+rpGain();
  if(S.cur==='inv'){
   const c=invCost();if(S.rp<c)return;S.rp-=c;
   let nm;for(let i=0;i<30;i++){nm=pick(INV_A)+' '+pick(INV_B);if(!S.inv.includes(nm))break}
   S.invN=(S.invN||0)+1;S.inv.unshift(nm);if(S.inv.length>40)S.inv.length=40;
   const s=pick(S.slimes);gain(s,pick(DK),5);
   log(`${s.name} inventou: ${nm}! (invenção nº ${S.invN})`);hist(`${s.name} inventou ${nm}.`);
   S.cur=null;checkEra();return;
  }
  const c=dcost(S.cur);if(S.rp<c)return;S.rp-=c;
  const id=S.cur,D=DISC[id];S.disc[id]=day();
  const s=S.slimes.slice().sort((a,b)=>(b.k[D[3]]||0)-(a.k[D[3]]||0))[0];
  if(s){gain(s,D[3],6);addFact(s,D[3],`A vila descobriu: ${D[0]}. ${D[5]}`)}
  log(`Descoberta! ${s?s.name+' liderou':'A vila'} a invenção de: ${D[0]}. ${D[5]}`);hist(`Descobriram ${D[0]}${s?' (graças a '+s.name+')':''}.`);
  if(s&&Math.random()<.3)legend(`${s.name}, que ajudou a descobrir ${D[0].toLowerCase()}`);
  if(S.event&&EVENTS[S.event.k]&&EVENTS[S.event.k].sol===id){log(`A vila venceu: ${EVENTS[S.event.k].n}! A descoberta de ${D[0]} resolveu o problema.`);hist(`Venceram ${EVENTS[S.event.k].n.toLowerCase()} com ${D[0]}.`);S.event=null}
  S.cur=null;checkEra();
 }
 function checkEra(){const e=calcEra();if(e>(S.era||0)){S.era=e;log(`${eraIcon(e)} A vila entrou na ${eraName(e)}!`);hist(`Começou a ${eraName(e)}.`);festival(`Festa da ${eraName(e)}`)}}
 // ---- gerações ----
 const lifeOf=s=>Math.round((s.life||DAYSTEPS*120)*(1+.1*has('enfermaria')+.1*known('saneamento')+.2*known('vacinas')));
 const ageDays=s=>Math.max(0,Math.floor(((S.steps||0)-(s.bornStep||0))/DAYSTEPS));
 function retire(s){
  for(const d of DK)if(s.k[d])S.lib[d]=Math.round(((S.lib[d]||0)+s.k[d]*.5)*10)/10;
  const h=home(s);if(h){h.owner=0;h.free=1}
  S.slimes=S.slimes.filter(x=>x!==s);
  S.memorial.unshift({name:s.name,gen:s.gen,prof:profName(s),lv:level(s),days:ageDays(s),d:day()});if(S.memorial.length>80)S.memorial.length=80;
  log(`${s.name} viveu ${ageDays(s)} dias, chegou ao nível ${level(s)} e virou uma gotinha de memória que voltou para a floresta. Seus livros ficam na biblioteca.`);
  if(level(s)>=18){hist(`${s.name}, ${profName(s).toLowerCase()}, virou gotinha de memória depois de ${ageDays(s)} dias.`);legend(`${s.name}, ${profName(s).toLowerCase()} de nível ${level(s)}`)}
 }
 function generations(){
  for(const s of S.slimes.slice()){if(s.gen===1)continue;if((S.steps||0)-(s.bornStep||0)>lifeOf(s)&&S.slimes.length>8)retire(s)}
 }
 function libBoost(c){const f=.005*(has('escola')?2:1)*(known('imprensa')?1.5:1)*(known('internet')?1.5:1);for(const d of DK)if(S.lib[d])c.k[d]=Math.round(((c.k[d]||0)+S.lib[d]*f)*10)/10}
 // ---- novas vilas ----
 function colonies(){
  for(const v of S.villages){if(Math.random()<.08&&v.pop<30+5*(S.era||0))v.pop++}
  if(S.steps%300===0)for(const v of S.villages){
   const c=CULT.find(x=>x[0]===v.cult)||CULT[0],amt=Math.round(v.pop*12);
   const rmap={arte:'arte',ciencia:null,natureza:'frutas',agua:'refeicoes',construcao:'tijolos',saude:'remedios',culinaria:'refeicoes'},r=rmap[c[1]];
   if(r)add(r,amt);else S.rp=(S.rp||0)+amt;
   const s=pick(S.slimes);gain(s,c[1],1);
   if(Math.random()<.35)log(`Uma caravana de ${v.name} (vila de ${v.cult}) trouxe ${r?amt+' de '+RES[r].toLowerCase():'ideias novas para os sábios'}.`);
  }
  if(S.slimes.length>=MAXS-10&&(known('barco')||known('roda'))&&(S.steps||0)-(S.lastColony??-1e9)>DAYSTEPS*2&&S.villages.length<8){
   const go=S.slimes.filter(x=>x.gen>1).sort((a,b)=>(b.bornStep||0)-(a.bornStep||0)).slice(0,8);if(go.length<8)return;
   const used=new Set(S.villages.map(v=>v.cult)),cult=(CULT.find(c=>!used.has(c[0]))||pick(CULT))[0];
   const name=VNAMES.find(n=>!S.villages.some(v=>v.name===n))||('Vila '+(S.villages.length+1));
   for(const s of go){const h=home(s);if(h){h.owner=0;h.free=1}}
   S.slimes=S.slimes.filter(x=>!go.includes(x));
   S.villages.push({id:S.nextId++,name,cult,pop:8,side:S.villages.length%2?-1:1,d:day(),founders:go.map(x=>x.name)});
   S.lastColony=S.steps;
   log(`${go.slice(0,3).map(x=>x.name).join(', ')} e mais ${go.length-3} partiram para fundar ${name}, uma nova vila de ${cult}!`);hist(`Fundaram ${name}, uma vila de ${cult}.`);
  }
 }
 // ---- problemas que mudam ----
 function events(){
  if(S.event){if((S.steps||0)-S.event.start>S.event.dur){log(`${EVENTS[S.event.k].n} passou. A vila aprendeu a se preparar melhor.`);S.event=null}return}
  if(S.steps%300!==0||Math.random()>.22)return;
  const ck=clock(S.steps);
  const ok=Object.keys(EVENTS).filter(k=>(S.era||0)>=EVENTS[k].era&&(k!=='poluicao'||S.pol>40)&&(k!=='apagao'||known('eletricidade'))&&(k!=='seca'||ck.si!==3));
  if(!ok.length)return;const k=pick(ok),E0=EVENTS[k];
  if(known(E0.sol)&&k!=='poluicao'){S.event={k,start:S.steps,dur:Math.round(E0.dur/2),soft:1};log(`${E0.i} ${E0.n} chegou, mas graças à descoberta ${DISC[E0.sol][0]} atrapalhou bem pouco.`);return}
  S.event={k,start:S.steps,dur:E0.dur};log(`${E0.i} Problema na vila: ${E0.n}. ${E0.d} Os sábios vão pesquisar ${DISC[E0.sol][0].toLowerCase()} para resolver.`);hist(`${E0.n} atingiu a vila.`);
 }
 function pollution(){
  S.pol=Math.max(0,Math.min(100,(S.pol||0)+.02*cnt('fabrica')-.03*cnt('usina')-.03*cnt('reciclagem')-treeCount/40000-(known('cidade_verde')?.03:0)));
  if(S.event&&S.event.k==='poluicao'&&S.pol<10&&known('reciclagem')){log('O ar ficou limpo de novo! A poluição foi vencida.');hist('Venceram a poluição.');S.event=null}
 }
 // ---- cultura ----
 function legend(t){S.culture.legends.unshift({d:day(),t:'A lenda de '+t});if(S.culture.legends.length>30)S.culture.legends.length=30}
 function festival(nome){
  if(!has('praca'))return;S.culture.fest={n:nome,until:(S.steps||0)+DAYSTEPS/2};
  for(const s of S.slimes)gain(s,'arte',.3);add('arte',S.slimes.length*2);
  const s=pick(S.slimes),song=Math.random()<.5?pick(SONGS):`Canção de ${s.name}`;
  if(!S.culture.songs.some(x=>x.n===song)){S.culture.songs.unshift({n:song,by:s.name,d:day()});if(S.culture.songs.length>30)S.culture.songs.length=30}
  let comp='';if(S.villages.length){const v=pick(S.villages),c=CULT.find(x=>x[0]===v.cult);const win=Math.random()<.5;comp=` Na competição de ${DOMS[c[1]].n.toLowerCase()} contra ${v.name}, ${win?'nossa vila ganhou':v.name+' ganhou'}!`;if(Math.random()<.5)hist(`Competição de ${DOMS[c[1]].n.toLowerCase()}: ${win?'vitória nossa':'vitória de '+v.name}.`)}
  log(`🎉 ${nome}! Todos dançaram na praça e ${s.name} cantou “${song}”.${comp}`);
 }
 function civStep(){
  research();
  if(S.steps%10===0){generations();colonies();pollution()}
  events();
  if(has('fabrica'))add('ferramentas',.1*cnt('fabrica'));
 }
 function step(last){
  const n=S.slimes.length,tools=1+Math.min(.5,(S.res.ferramentas||0)*.02);
  const hungry=S.res.frutas+S.res.refeicoes+S.res.insetos<=0.01;
  spawnBugs();
  S.alerta*=.97;S.threat=Math.max(0,S.threat-.004);
  let busy=[];if(S.pred)busy=predStep(last)||[];else predSpawn();
  const low=S.res.frutas+S.res.insetos+S.res.refeicoes*2<n*4;
  const ck=clock(S.steps);
  if(ck.si!==S.seasonIdx){S.seasonIdx=ck.si;festival(['Festa das Flores','Festa do Verão','Festa da Colheita','Festa das Lanternas'][ck.si]);log(['A primavera chegou! Flores por toda parte e muitos insetos voando.','Chegou o verão: as árvores estão carregadas de frutas.','O outono chegou: as folhas caem e os slimes começam a guardar comida para o inverno.','O inverno chegou: as árvores quase não dão frutas. Hora de usar a comida guardada!'][ck.si])}
  const M=(ck.night?.6:1)*(1+vbonus())*techAll()*eventMult('geral')*tools*(hungry?.5:1+Math.min(.3,(S.res.arte||0)/200+(has('praca')?.1:0)+(S.res.remedios>1?.05:0)));
  add('frutas',.7*Math.min(n,fruitTrees/2+1)*(has('horta')?1.3:1)*M*ck.season.fr*techMult('natureza'));
  S.res.frutas*=has('celeiro')?(cnt('celeiro')>1?.99995:.9999):ck.si===1?.9993:.9996;
  add('madeira',.15*n*M);
  const nd=needs();
  for(const s of S.slimes.slice()){if(busy.includes(s))continue;if(s.scared>0){s.scared--;if(last){s.task=null;if(!s.say||!/medo/.test(s.say))s.say='Ainda estou com um pouquinho de medo…'}continue}if(S.bugs.length&&Math.random()<(low?.35:.1)*Math.min(1,S.bugs.length/(S.slimes.length*.25))&&hunt(s,last))continue;doTask(s,nd,last)}
  let need=.35*n*(ck.si===3?1.15:1);const meals=Math.min(S.res.refeicoes,need/2);S.res.refeicoes-=meals;need-=meals*2;const bi=Math.min(S.res.insetos,need*.5);S.res.insetos-=bi;need-=bi;S.res.frutas=Math.max(0,S.res.frutas-need);
  if(n>1&&Math.random()<.3){const a=pick(S.slimes),b=pick(S.slimes);if(a!==b){const[t,l]=level(a)>=level(b)?[a,b]:[b,a],d=profOf(t);if(d)gain(l,d,.3*(has('biblioteca')?1.25:1))}}
  if(hungry&&ck.si===3&&Math.random()<.05){const x=pick(S.slimes);if(addFact(x,'culinaria','Lição: Guardar comida no outono ajuda a passar o inverno.'))log(`${x.name} sentiu fome no inverno e aprendeu: guardar comida no outono ajuda a passar o inverno.`)}
  if(has('viveiro')&&S.res.mudas>=1&&Math.random()<.3&&plantTree()){S.res.mudas-=1;log('Uma muda nova foi plantada na floresta.')}
  S.steps=(S.steps||0)+1;
  civStep();
  if(S.steps%3===0){autoBuild();checkExpand()}
  if(S.steps%15===0)upgrade();
  if(S.steps%5===0&&S.ideas.length)workIdeas();
  if(has('estaleiro')&&S.steps%4===0)add('refeicoes',.4*(S.buildings.find(b=>b.type==='estaleiro').nv||1));
  if(has('hangar')&&S.steps%60===0){const x=pick(S.slimes);gain(x,pick(DK),.6);if(Math.random()<.15)log(`Um aviãozinho voltou de longe e ${x.name} aprendeu uma novidade.`)}
  if(S.steps%10===0&&has('mercado'))market();
 }
 function capOf(k){const n=S.slimes.length,cel=1+.5*cnt('celeiro');if(k==='frutas'||k==='refeicoes'||k==='insetos')return Math.round((300+60*n)*cel);if(k==='madeira'||k==='pedra'||k==='tijolos')return 400+80*n;if(k==='ferramentas'||k==='remedios')return 100+15*n;return 300+50*n}
 function run(steps){for(let i=0;i<steps;i++){step(i===steps-1);if(i%20===0)for(const k in S.res)if(S.res[k]>capOf(k))S.res[k]=capOf(k)}for(const k in S.res)S.res[k]=Math.round(Math.max(0,Math.min(S.res[k],capOf(k)))*100)/100}
 function news(){const l=S.log.slice(0,25).map(x=>x.t).filter(t=>/(nasceu|construiu|apareceu|espantaram|melhorou|chegou|cresceu|primavera|verão|outono|inverno|caçou)/i.test(t)&&!/(ideia de|ensinou|pedido de|conversou)/.test(t));return l.length?pick(l.slice(0,6)):null}
 function answer(s,text,author,fr){
  author=author||'amigo';fr=fr||{n:1};
  const t=norm(text).trim(),n=S.slimes.length,ck=clock(S.steps),r=S.res;
  const isQ=/\?\s*$/.test(text.trim())||/^(o que|oque|como|por que|porque|pq|quem|onde|quando|qual|quais|quanto|sera|voce sabe|me (diz|fala|conta))\b/.test(t);
  if(isQ&&/(email|e-mail|telefone|celular|whats|endereco|onde (ele|ela|fulano|voce)? ?mora|senha|cpf|\bip\b|\buid\b|quem (te )?(falou|disse|mandou|escreveu|conversou)|quem esteve|outras pessoas|outros visitantes|nome (dele|dela|de quem)|dados)/.test(t))
   return 'Isso eu não conto! O que os visitantes falam comigo e os dados de cada um ficam bem guardadinhos. Mas posso contar coisas da floresta!';
  if(/(obrigad|valeu|brigad)/.test(t)&&t.length<40)return pick([`De nada, ${author}! Amigos se ajudam!`,`Imagina! Eu que agradeço por conversar comigo.`,`Por nada! Volta sempre, tá?`]);
  if(/^(tchau|ate logo|ate mais|ate amanha|fui|xau|bye)/.test(t))return pick([`Tchau, ${author}! Vou ficar aqui cuidando da vila. Volta logo!`,`Até mais! Quando você voltar vou ter coisas novas para contar.`,`Tchauzinho! Vou guardar nossa conversa na minha gelatina.`]);
  if(/(gosto de voce|te amo|amo voce|voce e fofo|fofinho|fofinha|voce e lindo|voce e linda|meu amigo|minha amiga)/.test(t))return pick([`Ownn, ${author}! Fiquei até mais azulzinho de vergonha. Também gosto muito de você!`,'Que fofo! Você é meu amigo humano favorito.','Hihi, assim eu derreto! Mas não muito, senão viro poça.']);
  if(/(piada|algo engracado|me faz rir)/.test(t))return pick(JOKES);
  if(/(vamos brincar|brincadeira|adivinha|charada)/.test(t))return pick(['Adivinha: o que é, o que é, cai em pé e corre deitado? É a chuva!','O que é, o que é: tem dentes mas não morde? O pente! Agora é sua vez de me perguntar uma!','O que é, o que é: quanto mais se tira, maior fica? Um buraco! Hihi.']);
  if(/(como foi (o )?seu dia|novidade|o que aconteceu|o que ha de novo|me conta (uma )?novidade)/.test(t)){const n0=news();return n0?`Olha só o que aconteceu por aqui: ${n0} E o seu dia, como foi?`:`Hoje foi tranquilo: passei o tempo ${s.task&&TASK[s.task]?TASK[s.task].v:'descansando'}. E você, fez o quê?`}
  if(/(comida favorita|gosta de comer|o que voce come)/.test(t))return `Eu adoro ${profOf(s)==='culinaria'?'geleia de frutas vermelhas que eu mesmo faço':profOf(s)==='natureza'?'frutas fresquinhas, direto do pé':'grilinhos crocantes e frutinhas'}! E você, qual é a sua comida favorita?`;
  if(/(do que voce gosta|o que voce gosta|seu hobby|o que te deixa feliz)/.test(t))return `Eu gosto muito de ${profOf(s)?TASK[profOf(s)].v:'explorar a floresta'} e de conversar com amigos como você. E você, do que gosta de fazer?`;
  if(/^(oi+|ola|ole|eai|e ai|bom dia|boa tarde|boa noite|hey|salve)\b/.test(t)&&t.length<25){
   if(fr.n>1){const n0=news();return `Oi de novo, ${author}! Que bom que você voltou${fr.last?`. Da última vez você me ensinou sobre ${fr.last}`:''}! ${n0?'Olha a novidade: '+n0:'Quer ver o que eu aprendi?'}`}
   return `Oi, ${author}! Eu sou ${s.name}, ${profName(s).toLowerCase()} de nível ${level(s)}. ${ck.night?'Está de noite aqui, mas ainda estou acordadinho.':'Que bom te conhecer!'} Pode me perguntar coisas ou me ensinar o que você sabe!`}
  if(false)
   return `Oi! Eu sou ${s.name}, ${profName(s).toLowerCase()} de nível ${level(s)}. ${ck.night?'Está de noite aqui, mas ainda estou acordadinho.':'Que bom te ver por aqui!'} Quer saber o que estou fazendo ou o que já aprendi?`;
  if(/(tudo bem|como (voce )?(esta|vai)|ta bem|como se sente)/.test(t)){
   const food=r.frutas+r.insetos+r.refeicoes*2,hung=food<n*2;
   return s.scared>0?'Ainda estou um pouquinho assustado com o último bicho que apareceu… mas já vai passar!':S.pred?`Estou atento! ${PRED[S.pred.k].art[0].toUpperCase()+PRED[S.pred.k].art.slice(1)} ${PRED[S.pred.k].n} está rondando a vila.`:hung?'Estou com um pouco de fome. A vila precisa de mais comida!':'Estou ótimo! A barriga está cheia e a vila está tranquila.';
  }
  if(/(seu nome|quem (e|eh) voce|quem voce e|voce e quem)/.test(t))return `Eu sou ${s.name}! Sou ${profName(s).toLowerCase()}, estou no nível ${level(s)} e já juntei ${fmt(total(s))} de conhecimento.`;
  if(/(fazendo|trabalhando|ocupad)/.test(t))return s.task&&TASK[s.task]?`Agora estou ${TASK[s.task].v}. Já tive ${s.ok} acertos e ${s.err} erros, e aprendi com todos!`:'Estou descansando um pouquinho.';
  if(/(quantos slimes|quantos voces|quantos sao|quantos tem)/.test(t))return `Somos ${n} slimes na vila: ${S.slimes.slice(0,6).map(x=>x.name).join(', ')}${n>6?' e mais alguns':''}.`;
  if(/(estacao|que dia|que horas|hora|noite|frio|calor|inverno|verao|outono|primavera)/.test(t)&&!/(como|por que|porque)/.test(t))
   return `Aqui é ${ck.season.n.toLowerCase()}, dia ${ck.day} do mundo, por volta das ${Math.floor(ck.hour)}h. ${['Tem flores e insetos por toda parte!','As árvores estão carregadas de frutas!','Estamos guardando comida para o inverno.','Faz frio e quase não tem frutas, então usamos a comida guardada.'][ck.si]}`;
  if(/(perigo|lobo|raposa|javali|bicho|ataque|defesa|proteg)/.test(t)&&/\?|como|tem|esta|vai/.test(t)){
   const pro=['cerca','fogueira','torre'].filter(has).map(x=>B[x].n.toLowerCase());
   return (S.pred?`Cuidado, ${PRED[S.pred.k].art} ${PRED[S.pred.k].n} está perto da vila agora! `:'Agora está tudo calmo. ')+(pro.length?`Nós já temos ${pro.join(', ')} para nos proteger.`:'Ainda não temos proteções, mas os guardiões estão aprendendo.');
  }
  if(/(que era|qual era|em que era|qual a era|era de voces|era voces)/.test(t))return `Estamos na ${eraIcon(S.era||0)} ${eraName(S.era||0)}! Já fizemos ${Object.keys(S.disc).length} descobertas${S.invN?` e ${S.invN} invenções`:''}. ${S.cur&&S.cur!=='inv'?`Agora os sábios estudam ${DISC[S.cur][0].toLowerCase()}.`:S.cur==='inv'?'Agora estamos inventando coisas que ninguém nunca viu!':''}`;
  if(/(descobri|invent|pesquisando|estudando|tecnologia)/.test(t)){const last=Object.entries(S.disc).sort((a,b)=>b[1]-a[1])[0];return `${S.inv[0]?`A última invenção foi: ${S.inv[0]}! `:last?`A última descoberta foi ${DISC[last[0]][0].toLowerCase()}. `:''}${S.cur==='inv'?'Agora estamos inventando algo novinho.':S.cur?`Agora estamos estudando ${DISC[S.cur][0].toLowerCase()}: ${DISC[S.cur][5].toLowerCase()}`:''} Quer me ensinar alguma coisa que ajude?`}
  if(/(lenda|historia da vila|conta uma historia|era uma vez)/.test(t)){const L=S.culture.legends;if(L.length)return `${pick(L).t}. Os mais velhos contam essa história nas festas!`;const h=S.history[S.history.length-1];return h?`No começo de tudo, ${h.t.charAt(0).toLowerCase()+h.t.slice(1)} Desde então muita coisa aconteceu!`:'Nossa história está só começando!'}
  if(/(cancao|musica|canta|cantar)/.test(t)){const so=S.culture.songs;return so.length?`Uma das nossas músicas favoritas é “${pick(so).n}”! Lá-lá-lá… 🎵 Você sabe alguma canção?`:'Ainda estamos aprendendo a fazer músicas. Me ensina uma?'}
  if(/(outras vilas|outra vila|vizinh|colonia)/.test(t))return S.villages.length?`Temos ${S.villages.length} vilas amigas: ${S.villages.map(v=>`${v.name} (vila de ${v.cult})`).join(', ')}. Elas mandam caravanas com presentes!`:'Ainda somos só uma vila. Quando ficarmos bem cheios, um grupo vai partir para fundar uma vila nova!';
  if(/(problema|seca|enchente|praga|poluicao|gripe|tempestade|apagao)/.test(t)&&/\?|como|tem|esta/.test(t)){const ev=S.event&&EVENTS[S.event.k];return ev?`Estamos enfrentando: ${ev.n}. ${ev.d} ${S.event.soft?'Mas já sabemos lidar com isso!':`Os sábios estão estudando ${DISC[ev.sol][0].toLowerCase()} para resolver.`}`:'Agora está tudo em paz, sem problemas na vila!'}
  if(/(idade|quantos anos|quantos dias|velho|velhinho)/.test(t))return s.gen===1?`Eu sou o ancião fundador! Estou aqui desde o primeiro dia, há ${day()} dias.`:`Tenho ${ageDays(s)} dias de vida. Quando eu ficar bem velhinho, vou virar uma gotinha de memória e meu saber fica nos livros da biblioteca.`;
  if(/(precisa|falta|necessita)/.test(t)){const nd=needs(),top=DK.slice().sort((a,b)=>nd[b]-nd[a])[0];return nd[top]>0?`A vila está precisando de mais ${DOMS[top].n.toLowerCase()}. Se você souber algo sobre isso, me ensina!`:'A vila está bem servida agora. Mas sempre dá para aprender mais!'}
  if(/(o que (voce )?(sabe|aprendeu)|me (conta|ensina) (algo|alguma)|curiosidade)/.test(t)){const f=pick(s.facts.filter(x=>x.src||/^Lição/.test(x.f))||[]);return f?`Uma coisa que eu aprendi: ${f.f.replace(/^Lição: /,'')}`:`Sei que ${pick(ENC[profOf(s)||'natureza'])[0].toLowerCase()+pick(ENC[profOf(s)||'natureza']).slice(1)}`}
  if(!isQ)return null;
  // procura no que a vila sabe (só fatos pesquisados, lições e saberes da floresta; nunca o que outros visitantes escreveram)
  const q=words(text);if(!q.length)return null;
  let best=null,bs=0;
  const consider=(f,who)=>{const w=new Set(words(f));let sc=0;for(const x of q)if(w.has(x)||[...w].some(y=>y.length>4&&(y.startsWith(x.slice(0,5))||x.startsWith(y.slice(0,5)))))sc++;if(sc>bs){bs=sc;best={f,who}}};
  for(const x of S.slimes)for(const f of x.facts)if((f.src||/^Lição/.test(f.f))&&safeText(f.f))consider(f.f.replace(/^Lição: /,''),x===s?null:x.name);
  for(const d of DK)for(const f of ENC[d])consider(f,null);
  if(best&&bs>=Math.min(2,q.length))return best.who?`Hmm, ${best.who} me contou uma coisa sobre isso: ${best.f}`:`Eu sei! ${best.f}`;
  const tema=clean(text).replace(/[?!.]+$/,'').slice(0,80);
  if(S.queue.length<6&&safeText(tema)&&!S.queue.some(x=>x.tema===tema))S.queue.push({slime:s.id,tema});
  return safeText(tema)?`Ainda não sei responder isso… Vou pesquisar e te conto aqui no chat quando descobrir!`:'Hmm, esse assunto não é para slimes. Vamos falar da floresta, da vila ou de como construir coisas?';
 }
 function talk(s,author,text){
  BAD.lastIndex=0;const rude=BAD.test(text);BAD.lastIndex=0;const raw=String(text||'');
  text=clean(text).slice(0,400);const scrubbed=text.includes('[removido]')&&!raw.includes('[removido]');author=clean(author).slice(0,24)||'Visitante';
  const q0=S.queue.length;lastIdea=null;
  const g0=total(s),mult=has('biblioteca')?1.25:1;
  const fk=norm(author).slice(0,24),fr=S.friends[fk]||(S.friends[fk]={n:0});fr.n++;{const ks=Object.keys(S.friends);if(ks.length>300)delete S.friends[ks[0]]}
  let reply=rude?'Opa, vamos conversar com gentileza? Slimes ficam tristinhos com palavras feias.':safeText(text)?(teachIdea(s,author,text)||answer(s,text,author,fr)):'Hmm, esse assunto não é para slimes. Vamos falar da floresta, da vila ou de como construir coisas?';
  const hits=detect(text),ds=Object.keys(hits).sort((a,b)=>hits[b]-hits[a]);
  if(reply){if(ds.length)gain(s,ds[0],.5*mult);else gain(s,profOf(s)||pick(DK),.3)}
  else if(!ds.length){reply=pick([`Hihi, que legal conversar com você, ${author}! Me conta: o que você mais gosta na natureza?`,`Hmm… não entendi tudo, mas adorei! Você sabe como as árvores dão frutas? Eu tô aprendendo isso.`,`Eu adoro ouvir você! Sabia que dá para me ensinar a construir coisas novas? Tenta: “construam um jardim”.`,`Que interessante! Pode me perguntar coisas também, tipo o que estou fazendo, se tem perigo ou me pedir uma piada.`]);gain(s,profOf(s)||pick(DK),.5)}
  else{
   const f=text.trim().replace(/\s+/g,' ');
   const q=f.length>90?f.slice(0,90)+'…':f,dn=DOMS[ds[0]].n.toLowerCase();fr.last=dn;
   reply=pick([`Que legal, ${author}! Eu não sabia disso: “${q}”. Vou contar para os outros slimes!`,`Hmm… “${q}”. Faz sentido! Vou testar isso no meu trabalho.`,`Anotado na minha gelatina! “${q}”. Você entende muito de ${dn}!`,`Uau, que dica boa! Vou praticar isso hoje mesmo.`]);
   const kf=s.facts.filter(x=>x.d===ds[0]&&(x.src||/^Lição/.test(x.f))&&safeText(x.f));const tw=new Set(words(f));const ov=x=>words(x).filter(w=>tw.has(w)).length;const pool=kf.map(x=>x.f.replace(/^Lição: /,'')).concat(ENC[ds[0]]).filter(x=>ov(x)>0&&norm(x)!==norm(f));const share=pool.length?pool.sort((a,b)=>ov(b)-ov(a))[0]:pick(ENC[ds[0]]);
   if(Math.random()<.6)reply+=` E sabe o que eu aprendi sobre isso? ${share}`;
   reply+=' '+pick(['O que mais você sabe?','Você já viu isso de perto?','Como você aprendeu isso?','Me ensina mais uma?','Que mais posso aprender com você?']);
   gain(s,ds[0],Math.min(5,1+ds.reduce((a,d)=>a+hits[d],0)+(f.length>60?1:0))*mult);
   s.focus={d:ds[0],n:12};s.w[ds[0]]=(s.w[ds[0]]||1)+1.5;
  }
  if(scrubbed)reply+=' (Tirei da conversa os contatos e dados pessoais que você escreveu, para te proteger.)';
  const g=total(s)-g0;
  const dn=ds.length?DOMS[ds[0]].n.toLowerCase():'';
  const resumo=rude||!safeText(text)?`conversou com ${s.name}`:lastIdea?`ensinou ${s.name} a construir: ${lastIdea.toLowerCase()}`:S.queue.length>q0?`fez uma pergunta que ${s.name} vai pesquisar`:ds.length?(/\?\s*$/.test(text.trim())?`perguntou sobre ${dn}`:`ensinou sobre ${dn}`):`bateu um papo com ${s.name}`;
  pushChat(s,{r:'u',pub:1,a:author,t:resumo,g:g>0?`+${fmt(g)} de conhecimento`:''});
  log(`${author} conversou com ${s.name}.`);
  return{reply,gain:g,resumo};
 }
 function learnResearch(s,tema,out,why,priv){
  if(priv||out.title)tema=out.title||'o que perguntaram';
  const g0=total(s),mult=has('biblioteca')?1.25:1;let n=0;
  for(const a of out.learn){if(addFact(s,a.dominio,a.fato,a.fonte)){gain(s,a.dominio,2*mult);n++}}
  const g=total(s)-g0;
  pushChat(s,{r:'sys',t:`${s.name} pesquisou${out.web?' na internet':''} sobre “${tema}”${why?', '+why:''}.`});
  pushChat(s,{r:'s',t:out.reply+(out.learn.length?'\n'+out.learn.map(a=>'• '+a.fato+(a.fonte?' (fonte: Wikipédia)':'')).join('\n'):''),g:g>0?`+${fmt(g)} de conhecimento`:''});
  log(`${s.name} pesquisou${out.web?' na internet':''} sobre “${tema}”${why?' ('+why+')':''} e aprendeu ${n} coisas.`);
  s.lastFail=null;
  return{gain:g,n};
 }
 function localResearch(s,tema){
  const h=detect(tema);const d=Object.keys(h).sort((a,b)=>h[b]-h[a])[0]||profOf(s)||pick(DK);
  const known=new Set(s.facts.map(f=>f.f));const pool=ENC[d].filter(f=>!known.has(f)).sort(()=>Math.random()-.5).slice(0,3);
  return{title:DOMS[d].n.toLowerCase(),reply:pool.length?`Fui olhar pela floresta e descobri coisas sobre ${DOMS[d].n.toLowerCase()}!`:`Já sei tudo o que encontrei sobre ${DOMS[d].n.toLowerCase()} por aqui!`,learn:pool.map(f=>({dominio:d,fato:f}))};
 }
 function researchPlan(){
  const c=S.slimes;const nd=needs(),top=DK.slice().sort((a,b)=>nd[b]-nd[a])[0];
  const fails=c.filter(x=>x.lastFail);const s=fails.length&&Math.random()<.5?pick(fails):pick(c);
  let d,why;
  if(nd[top]>0&&Math.random()<.6){d=top;why='porque a vila precisa'}else if(s.lastFail){d=s.lastFail;why='porque errou nisso'}else{d=profOf(s)||top;why='por curiosidade'}
  return{s,d,why,tema:TASK[d].topic,wiki:pick(WIKI[d])};
 }
 if(!S.civInit){S.civInit=1;
  const BT={fogueira:'fogo',cozinha:'fogo',horta:'agricultura',casa:'tijolo',sobrado:'tijolo',biblioteca:'escrita',enfermaria:'ervas_med',atelie:'musica',oficina:'ferramentas',fonte:'irrigacao',ponte:'engenharia',celeiro:'ceramica'};
  for(const b of S.buildings){const t=B[b.type]&&B[b.type].tech;if(t)grant(t);if(BT[b.type])grant(BT[b.type])}
  if(S.slimes.length>3){grant('coleta');grant('cordas')}
  for(const s of S.slimes){if(s.bornStep===undefined)s.bornStep=s.gen===1?0:Math.round((S.steps||0)-Math.random()*DAYSTEPS*70);if(!s.life)s.life=Math.round(DAYSTEPS*(96+Math.random()*48))}
  S.era=calcEra();
  if(!S.history.length){hist(`${S.slimes[0]?S.slimes[0].name:'Azulim'} acordou na clareira da floresta e a história da vila começou.`);for(const id of Object.keys(S.disc))hist(`A vila já sabia: ${DISC[id][0]}.`);hist(`A vila está na ${eraName(S.era)}.`)}
 }
 if(!S.ideasScanned){S.ideasScanned=1;for(const x of S.slimes)for(const m of x.chat)if(m.r==='u'&&m.t&&safeText(m.t))teachIdea(x,m.a||'Visitante',m.t)}
 return{S,T,inB,isWet,home,has,needs,run,talk,capOf,known,available,dcost,invCost,eraName,eraIcon,calcEra,rpGain,ageDays,lifeOf,yearOf,clock:()=>clock(S.steps),learnResearch,localResearch,researchPlan,log,get fruitTrees(){return fruitTrees},get treeCount(){return treeCount}};
}
