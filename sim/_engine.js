const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const MAXS=30;
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

function newState(){
 const now=Date.now();
 const S={v:2,seed:(Math.random()*1e9)|0,created:now,last:now,bounds:{x0:-14,y0:-14,x1:14,y1:12},slimes:[],buildings:[],planted:[],res:{frutas:10,madeira:4},log:[],nextId:1,steps:0};
 for(const k in RES)S.res[k]=S.res[k]||0;
 const s={id:S.nextId++,name:'Azulim',hue:210,gen:1,k:{},facts:[],chat:[],home:null,x:0,y:1,nextSplit:25,born:now,topic:'',w:{},ok:0,err:0};
 s.chat.push({r:'s',t:'Oi! Eu sou o Azulim. Acabei de acordar nesta floresta… Tem tantas árvores e um barulhinho de cachoeira! Me ensina coisas?',at:now});
 S.slimes.push(s);S.log.unshift({t:'Azulim acordou na clareira da floresta.',at:now});
 return S;
}

function Engine(S){
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
 function indexB(){bAt.clear();for(const b of S.buildings)bAt.set(b.x+','+b.y,b)}
 function inB(x,y){const b=S.bounds;return x>b.x0&&x<b.x1&&y>b.y0&&y<b.y1}
 function countTrees(){fruitTrees=0;treeCount=0;const b=S.bounds;for(let y=b.y0+1;y<b.y1;y++)for(let x=b.x0+1;x<b.x1;x++){const t=T(x,y);if(t.t==='T'){treeCount++;if(t.kind==='fruta')fruitTrees++}}}
 indexB();countTrees();
 function buildable(x,y){
  if(!inB(x,y)||T(x,y).t!=='G')return false;
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
  s.k[d]=Math.round(((s.k[d]||0)+pts)*100)/100;
  if(profName(s)!==pn0)log(`${s.name} agora é ${profName(s)}!`);
  if(level(s)>l0)log(`${s.name} chegou ao nível ${level(s)}.`);
  while(total(s)>=s.nextSplit){if(S.slimes.length>=MAXS){s.nextSplit=Math.round(s.nextSplit*1.9+10);break}split(s)}
 }
 function split(s){
  s.nextSplit=Math.round(s.nextSplit*1.9+10);
  const used=new Set(S.slimes.map(x=>x.name));
  const name=NAMES.find(n=>!used.has(n))||('Slime '+S.nextId);
  const hue=Math.max(175,Math.min(290,s.hue+(Math.random()*50-25)));
  const c={id:S.nextId++,name,hue:Math.round(hue),gen:s.gen+1,k:{},facts:s.facts.slice(-3).map(f=>({...f})),chat:[],home:null,x:s.x+.6,y:s.y+.3,nextSplit:0,born:Date.now(),topic:'',w:{},ok:0,err:0};
  for(const d of DK)if(s.k[d])c.k[d]=Math.round(s.k[d]*.15*10)/10;
  c.nextSplit=Math.round(total(c)+25);
  const cov=DK.map(d=>[d,S.slimes.filter(x=>profOf(x)===d).length]).sort((a,b)=>a[1]-b[1]||Math.random()-.5);c.w[cov[0][0]]=4;
  pushChat(c,{r:'s',t:`Oi! Eu nasci do ${s.name}! Lembro de umas coisinhas que ele sabia, mas quero aprender as minhas próprias. Acho que vou gostar de ${DOMS[cov[0][0]].n.toLowerCase()}!`});
  S.slimes.push(c);
  log(`${s.name} atingiu ${Math.floor(total(s))} de conhecimento e se dividiu! Nasceu ${name}.`);
 }
 const canAfford=c=>Object.entries(c).every(([r,v])=>(S.res[r]||0)>=v);
 function qualifies(s,type){const b=B[type];if(b.tot&&total(s)<b.tot)return false;return Object.entries(b.req).every(([d,v])=>(s.k[d]||0)>=v)}
 const facLimit=()=>1+Math.floor(S.slimes.length/6);
 function build(s,type){
  const b=B[type];if(!qualifies(s,type)||!canAfford(b.cost))return false;
  let spot;
  if(b.home){const h=home(s);if(h&&B[h.type].lv>=b.lv)return false;if(h){spot={x:h.x,y:h.y};S.buildings=S.buildings.filter(x=>x!==h)}}
  else if(cnt(type)>=Math.min(facLimit(),b.max||99))return false;
  if(!spot){const hh=home(s);spot=findSpot(hh?hh.x:0,hh?hh.y+1:1);if(!spot)return false}
  for(const[r,v]of Object.entries(b.cost))S.res[r]-=v;
  const nb={id:S.nextId++,type,x:spot.x,y:spot.y,owner:s.id,at:Date.now()};
  S.buildings.push(nb);if(b.home)s.home=nb.id;indexB();
  log(`${s.name} construiu: ${b.n}.`);return true;
 }
 function autoBuild(){
  for(const s of S.slimes){const h=home(s);for(const t of Object.keys(B).filter(t=>B[t].home).sort((a,b)=>B[b].lv-B[a].lv)){if(h&&B[h.type].lv>=B[t].lv)break;if(build(s,t))return}}
  if(S.slimes.some(s=>!s.home))return;
  for(const t of Object.keys(B)){if(B[t].home||cnt(t)>=Math.min(facLimit(),B[t].max||99))continue;const s=S.slimes.find(x=>qualifies(x,t));if(s&&build(s,t))return}
 }
 function plantTree(){
  const b=S.bounds;
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
  const n=S.slimes.length;
  if(freeSpots(4+n)<4+n&&S.bounds.x1-S.bounds.x0<140){const b=S.bounds;b.x0-=3;b.x1+=3;b.y0-=3;b.y1+=3;countTrees();log('O mundo cresceu! Novas áreas de floresta foram descobertas.')}
 }
 function needs(){
  const n=S.slimes.length,r=S.res,nd={};for(const d of DK)nd[d]=0;
  if(r.frutas+(r.insetos||0)+r.refeicoes*2<n*6)nd.natureza+=2;
  if(r.madeira<15)nd.carpintaria+=1.5;
  if(r.pedra<12)nd.pedra+=1;
  if(r.agua<10)nd.agua+=.8;
  if(r.frutas>20&&r.refeicoes<n*2)nd.culinaria+=.8;
  if(S.slimes.some(x=>{const h=home(x);return!h||B[h.type].lv<2}))nd.construcao+=1;
  if(S.threat>0)nd.defesa+=Math.min(3,S.threat);if(S.pred)nd.defesa+=2;
  if(n>=3){const cov=new Set(S.slimes.map(profOf));for(const d of DK)if(!cov.has(d))nd[d]+=1}
  return nd;
 }
 function chooseDomain(s,nd){
  if(s.focus&&s.focus.n>0){s.focus.n--;if(!s.focus.n)delete s.focus;return s.focus?s.focus.d:chooseDomain(s,nd)}
  const p=profOf(s);if(p&&Math.random()>.12)return p;
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
  const sk=s.k[d]||0,r=1+sk/40,mult=has('biblioteca')?1.25:1;
  if(d==='culinaria'&&S.res.frutas<1&&S.res.insetos<1){s.w[d]=Math.max(.2,s.w[d]-.3);return}
  let p=.3+.62*sk/(sk+25)+Math.min(.08,(S.res.ferramentas||0)*.004)-((S.res.frutas+S.res.refeicoes+S.res.insetos)<=.01?.12:0);
  if(d==='saude'||d==='ciencia'||d==='arte')p+=.05;
  if(Math.random()<p){
   let txt='';const hz=has('horta')?1.3:1;
   if(d==='natureza'){const v=2.5*r*hz;add('frutas',v);add('mudas',.3);txt=`+${fmt(v)} frutas`}
   else if(d==='construcao'){const v=1.2*r;add('tijolos',v);txt=`+${fmt(v)} tijolos`}
   else if(d==='carpintaria'){if(has('oficina')&&S.res.madeira>=4&&Math.random()<.4){S.res.madeira-=3;add('ferramentas',1);txt='fiz uma ferramenta!'}else{const v=2*r;add('madeira',v);txt=`+${fmt(v)} madeira`}}
   else if(d==='pedra'){const v=1.6*r;add('pedra',v);txt=`+${fmt(v)} pedras`}
   else if(d==='culinaria'){const fr=S.res.frutas>=1,f=Math.min(fr?S.res.frutas:S.res.insetos,2);if(fr)S.res.frutas-=f;else S.res.insetos-=f;const v=f*(has('cozinha')?2:1.3)*Math.min(2,r);add('refeicoes',v);txt=fr?`+${fmt(v)} refeições`:`espetinho de inseto! +${fmt(v)} refeições`}
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
  const n=S.slimes.length,cap=Math.min(20,4+n+Math.floor(treeCount/30));
  for(const b of S.bugs)b.age++;
  S.bugs=S.bugs.filter(b=>b.age<60);
  if(S.bugs.length>=cap||Math.random()>.45)return;
  let tw=0;for(const k in BUGS)tw+=BUGS[k].w;let x0=Math.random()*tw,k='grilo';for(const q in BUGS){x0-=BUGS[q].w;if(x0<=0){k=q;break}}
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
  let ch=.0025*(1+Math.min(n,24)/12);if(has('fogueira'))ch*=.55;
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
 function step(last){
  const n=S.slimes.length,tools=1+Math.min(.5,(S.res.ferramentas||0)*.02);
  const hungry=S.res.frutas+S.res.refeicoes+S.res.insetos<=0.01;
  spawnBugs();
  S.alerta*=.97;S.threat=Math.max(0,S.threat-.004);
  let busy=[];if(S.pred)busy=predStep(last)||[];else predSpawn();
  const low=S.res.frutas+S.res.insetos+S.res.refeicoes*2<n*4;
  const M=tools*(hungry?.5:1+Math.min(.3,(S.res.arte||0)/200+(has('praca')?.1:0)+(S.res.remedios>1?.05:0)));
  add('frutas',.7*Math.min(n,fruitTrees/2+1)*(has('horta')?1.3:1)*M);
  add('madeira',.15*n*M);
  const nd=needs();
  for(const s of S.slimes.slice()){if(busy.includes(s))continue;if(s.scared>0){s.scared--;if(last){s.task=null;if(!s.say||!/medo/.test(s.say))s.say='Ainda estou com um pouquinho de medo…'}continue}if(S.bugs.length&&Math.random()<(low?.35:.1)&&hunt(s,last))continue;doTask(s,nd,last)}
  let need=.35*n;const meals=Math.min(S.res.refeicoes,need/2);S.res.refeicoes-=meals;need-=meals*2;const bi=Math.min(S.res.insetos,need*.5);S.res.insetos-=bi;need-=bi;S.res.frutas=Math.max(0,S.res.frutas-need);
  if(n>1&&Math.random()<.3){const a=pick(S.slimes),b=pick(S.slimes);if(a!==b){const[t,l]=level(a)>=level(b)?[a,b]:[b,a],d=profOf(t);if(d)gain(l,d,.3*(has('biblioteca')?1.25:1))}}
  if(has('viveiro')&&S.res.mudas>=1&&Math.random()<.3&&plantTree()){S.res.mudas-=1;log('Uma muda nova foi plantada na floresta.')}
  S.steps=(S.steps||0)+1;
  if(S.steps%3===0){autoBuild();checkExpand()}
 }
 function run(steps){for(let i=0;i<steps;i++)step(i===steps-1);for(const k in S.res)S.res[k]=Math.round(Math.max(0,S.res[k])*100)/100}
 function talk(s,author,text){
  const hits=detect(text),ds=Object.keys(hits).sort((a,b)=>hits[b]-hits[a]);
  pushChat(s,{r:'u',t:text.slice(0,400),a:author});
  let reply,g0=total(s);
  const mult=has('biblioteca')?1.25:1;
  if(!ds.length){reply=pick(['Hihi, que legal conversar com você! Me ensina alguma coisa sobre a floresta, a água ou como construir uma casinha?','Hmm… não entendi tudo, mas gostei! Você sabe como as árvores dão frutas?','Eu adoro ouvir você! O que mais você sabe fazer?']);gain(s,profOf(s)||pick(DK),.5)}
  else{
   const f=text.trim().replace(/\s+/g,' ');
   reply=`Uau, ${author}! Então ${f.length>90?f.slice(0,90)+'…':f.charAt(0).toLowerCase()+f.slice(1)}${/[.!?]$/.test(f)?'':'!'} Vou guardar isso na minha gelatina e praticar! Me conta mais sobre ${DOMS[ds[0]].n.toLowerCase()}?`;
   addFact(s,ds[0],f.slice(0,200));
   gain(s,ds[0],Math.min(5,1+ds.reduce((a,d)=>a+hits[d],0)+(f.length>60?1:0))*mult);
   s.focus={d:ds[0],n:12};s.w[ds[0]]=(s.w[ds[0]]||1)+1.5;
  }
  const g=total(s)-g0;
  pushChat(s,{r:'s',t:reply,g:g>0?`+${fmt(g)} de conhecimento`:''});
  log(`${author} conversou com ${s.name}.`);
  return{reply,gain:g};
 }
 function learnResearch(s,tema,out,why){
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
  return{reply:pool.length?`Fui olhar pela floresta e descobri coisas sobre ${DOMS[d].n.toLowerCase()}!`:`Já sei tudo o que encontrei sobre ${DOMS[d].n.toLowerCase()} por aqui!`,learn:pool.map(f=>({dominio:d,fato:f}))};
 }
 function researchPlan(){
  const c=S.slimes;const nd=needs(),top=DK.slice().sort((a,b)=>nd[b]-nd[a])[0];
  const fails=c.filter(x=>x.lastFail);const s=fails.length&&Math.random()<.5?pick(fails):pick(c);
  let d,why;
  if(nd[top]>0&&Math.random()<.6){d=top;why='porque a vila precisa'}else if(s.lastFail){d=s.lastFail;why='porque errou nisso'}else{d=profOf(s)||top;why='por curiosidade'}
  return{s,d,why,tema:TASK[d].topic,wiki:pick(WIKI[d])};
 }
 return{S,T,inB,isWet,home,has,needs,run,talk,learnResearch,localResearch,researchPlan,log,get fruitTrees(){return fruitTrees},get treeCount(){return treeCount}};
}
