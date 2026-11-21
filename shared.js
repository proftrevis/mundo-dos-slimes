/* Gerado por sim/build-shared.js. Edite sim/_data.js e sim/_engine.js. */
(function(root){
const DOMS={
 natureza:{n:'Natureza e cultivo',p:'Agricultor',c:'#4caf50',kw:'planta arvore fruta semente solo terra flor cultivo colheita horta jardim adubo floresta folha raiz broto muda polinizacao abelha verdura legume plantar regar fotossintese'},
 construcao:{n:'Construção',p:'Construtor',c:'#d08b3c',kw:'casa construir construcao parede telhado tijolo fundacao arquitetura ponte estrutura cimento argila viga porta janela alicerce obra planta baixa'},
 carpintaria:{n:'Carpintaria',p:'Carpinteiro',c:'#a5683a',kw:'madeira serra prego movel moveis mesa cadeira martelo tabua carpinteiro galho lenha cola entalhe marcenaria verniz'},
 pedra:{n:'Pedras e minerais',p:'Pedreiro',c:'#8b93a1',kw:'pedra rocha mineral cristal geologia granito areia montanha caverna metal ferro cobre ouro quartzo marmore cascalho'},
 culinaria:{n:'Culinária',p:'Cozinheiro',c:'#e5683c',kw:'comida cozinhar receita pao sopa fogo forno sabor tempero mel bolo suco cozinha assar ferver geleia alimento nutricao'},
 ciencia:{n:'Ciência e saber',p:'Sábio',c:'#7a5cf0',kw:'ciencia matematica numero estrela sol lua fisica quimica experimento livro ler escrever historia energia planeta universo gravidade luz tempo calculo pesquisa por que'},
 arte:{n:'Arte e música',p:'Artista',c:'#e0509a',kw:'musica cancao cantar pintura pintar desenho desenhar cor arte danca poesia poema teatro beleza instrumento melodia escultura'},
 saude:{n:'Saúde e cura',p:'Curandeiro',c:'#2fb39b',kw:'saude remedio erva cha doenca cura corpo dormir sono descanso medico cuidar vitamina ferida exercicio higiene respirar'},
 agua:{n:'Água e rios',p:'Guardião das Águas',c:'#2f8cf0',kw:'agua rio riacho cachoeira chuva peixe lago nadar poco irrigacao nascente limpar mar onda gelo vapor ciclo filtrar'}
};
const DK=Object.keys(DOMS);
for(const d of DK)DOMS[d].kws=DOMS[d].kw.split(' ').filter(w=>w.length>2);
const RES={frutas:'Frutas',madeira:'Madeira',pedra:'Pedra',agua:'Água',ervas:'Ervas',tijolos:'Tijolos',mudas:'Mudas',ferramentas:'Ferramentas',refeicoes:'Refeições',remedios:'Remédios',arte:'Obras de arte'};
const B={
 ninho:{n:'Ninho de folhas',home:1,lv:1,tot:2,req:{},cost:{madeira:2},d:'Primeira moradia, de folhas e galhos caídos.'},
 cabana:{n:'Cabana de madeira',home:1,lv:2,req:{construcao:8},cost:{madeira:12},d:'Uma casinha de verdade.'},
 casa:{n:'Casa de pedra',home:1,lv:3,req:{construcao:25,pedra:8},cost:{madeira:10,pedra:20},d:'Firme e quentinha.'},
 sobrado:{n:'Sobrado',home:1,lv:4,req:{construcao:60},cost:{madeira:25,pedra:30,tijolos:20},d:'Dois andares, com varanda.'},
 horta:{n:'Horta',req:{natureza:10},cost:{madeira:6},d:'+30% de frutas para todos.'},
 viveiro:{n:'Viveiro de mudas',req:{natureza:25},cost:{madeira:10,agua:10},d:'Planta árvores novas e aumenta a floresta.'},
 oficina:{n:'Oficina',req:{carpintaria:12},cost:{madeira:15},d:'Carpinteiros fazem ferramentas (+produção).'},
 fonte:{n:'Fonte',req:{agua:10},cost:{pedra:10},d:'+50% de água coletada.'},
 cozinha:{n:'Cozinha',req:{culinaria:12},cost:{madeira:10,pedra:5},d:'Cozinheiros rendem mais refeições.'},
 biblioteca:{n:'Biblioteca',req:{ciencia:20},cost:{madeira:20,pedra:10},d:'+25% de conhecimento nas conversas.'},
 atelie:{n:'Ateliê',req:{arte:12},cost:{madeira:10},d:'Artistas criam o dobro de obras.'},
 enfermaria:{n:'Casa de cura',req:{saude:12},cost:{madeira:10,ervas:5},d:'Curandeiros preparam remédios.'},
 praca:{n:'Praça',req:{arte:30},cost:{pedra:25},d:'Mais bem-estar para todo mundo.'}
};
const NAMES='Gotinha Bolha Anil Celeste Lume Pingo Safira Brisa Orvalho Neblina Cristal Marola Turquesa Índigo Lagoa Chuvisco Geleia Mirtilo Nuvem Riacho Cascata Seixo Garoa Azulão Fofura Musgo Pétala Bruma Sereno Tilápia Jujuba Pipoca Cacau Ameixa Ventinho'.split(' ');
const ENC={
 natureza:['Árvores frutíferas precisam de abelhas para polinizar as flores.','Folhas caídas viram adubo e deixam o solo fértil.','Plantar mudas perto do riacho protege a margem da erosão.','A raiz das árvores segura a terra quando chove forte.','Frutas maduras podem guardar sementes para plantar de novo.'],
 construcao:['Uma boa fundação deixa a casa firme no chão.','Telhados inclinados deixam a chuva escorrer.','Argila misturada com palha vira tijolo quando seca ao sol.','Construir longe da margem do rio evita enchentes em casa.','Janelas viradas para o sol deixam a casa clara e quente.'],
 carpintaria:['Galhos caídos podem virar madeira sem cortar árvores vivas.','Madeira seca é mais leve e racha menos.','Encaixes bem feitos seguram móveis sem pregos.','Lixar a madeira deixa a superfície lisa.','Cada tipo de madeira tem uma dureza diferente.'],
 pedra:['O granito é uma rocha muito dura, ótima para construir.','Pedras do riacho ficam arredondadas pela água.','Areia é feita de pedrinhas muito pequenas.','Cristais crescem devagar dentro das rochas.','Pedras guardam calor do sol durante o dia.'],
 culinaria:['Ferver a água deixa ela segura para beber.','Frutas cozidas com mel viram geleia.','O pão cresce porque o fermento solta gás.','Temperos com ervas deixam a comida mais gostosa.','Comer frutas variadas dá energia e saúde.'],
 ciencia:['O Sol é uma estrela e nos dá luz e calor.','A Lua muda de forma porque vemos partes iluminadas dela.','A água evapora, vira nuvem e volta como chuva.','A gravidade faz as frutas caírem das árvores.','As plantas usam a luz do Sol para fazer o próprio alimento.'],
 arte:['Misturar azul com amarelo faz verde.','Música é feita de ritmo, melodia e harmonia.','Pigmentos podem ser feitos com frutas e terra colorida.','Dançar junto deixa a comunidade feliz.','Poemas brincam com o som das palavras.'],
 saude:['Dormir bem ajuda o corpo a se recuperar.','Chá de camomila acalma e ajuda a descansar.','Lavar ferimentos com água limpa evita infecções.','Beber água todo dia mantém o corpo saudável.','Hortelã ajuda na digestão.'],
 agua:['Nascentes são onde os rios começam.','Manter as árvores na margem deixa a água do riacho limpa.','Peixes precisam de água limpa e com oxigênio.','A cachoeira mistura ar na água do rio.','Areia e carvão ajudam a filtrar a água.']
};
const TASK={
 natureza:{v:'colhendo frutas',spot:'fruta',topic:'como cultivar árvores frutíferas e colher no ponto certo',f:[['colhi frutas verdes','Fruta madura solta fácil do galho.'],['pisei numa mudinha','Mudinhas precisam de espaço e cuidado ao passar perto.'],['esqueci de regar a muda','Mudas novas precisam de água todos os dias.']]},
 construcao:{v:'fazendo tijolos',spot:'casa',topic:'como fazer tijolos de barro e construir paredes firmes',f:[['o tijolo rachou ao secar','Tijolo seca melhor à sombra, bem devagar.'],['a parede ficou torta','Um fio com uma pedrinha na ponta ajuda a deixar a parede reta.'],['coloquei água demais no barro','Barro bom tem consistência de massinha.']]},
 carpintaria:{v:'juntando galhos caídos',spot:'T',topic:'como trabalhar madeira sem cortar árvores vivas',f:[['peguei um galho podre','Galho bom é seco, firme e sem fungos.'],['a tábua rachou','Trabalhar a madeira a favor dos veios evita rachaduras.'],['bati o martelo na minha gelatina','Segurar o prego com uma pinça protege o corpo.']]},
 pedra:{v:'buscando pedras',spot:'C',topic:'como escolher e carregar pedras para construir',f:[['a pedra rolou ladeira abaixo','Pedras pesadas devem ser roladas com calma.'],['escolhi uma pedra que esfarela','Pedra boa para construir é dura e não esfarela.'],['cheguei perto demais do paredão','Perto do paredão é preciso olhar se há pedras soltas.']]},
 culinaria:{v:'cozinhando',spot:'cozinha',topic:'receitas simples com frutas da floresta',f:[['queimei a geleia','Fogo baixo e mexer sempre evita queimar.'],['a sopa ficou sem gosto','Provar enquanto cozinha ajuda a acertar o tempero.'],['misturei frutas que não combinam','Frutas doces combinam com um pouco de fruta azedinha.']]},
 ciencia:{v:'observando o mundo',spot:'biblioteca',topic:'como fazer experimentos e aprender observando a natureza',f:[['minha teoria estava errada','Testar uma ideia várias vezes mostra se ela é verdadeira.'],['anotei tudo misturado','Organizar as anotações ajuda a lembrar e comparar.'],['contei as estrelas e me perdi','Dividir um problema grande em partes facilita.']]},
 arte:{v:'criando arte',spot:'atelie',topic:'como fazer tintas naturais e criar músicas',f:[['a tinta escorreu','Tinta mais grossa escorre menos.'],['desafinei a canção','Ouvir com atenção antes de cantar ajuda a afinar.'],['misturei cores demais e virou marrom','Misturar poucas cores de cada vez mantém o brilho.']]},
 saude:{v:'colhendo ervas',spot:'T',topic:'ervas medicinais seguras e como usá-las',f:[['colhi a erva errada','Antes de colher, compare a folha com uma erva conhecida.'],['fiz o chá forte demais','Chá de ervas fica melhor fraquinho e com água quente, não fervendo.'],['esqueci de descansar','Descansar também faz parte de cuidar da saúde.']]},
 agua:{v:'buscando água',spot:'W',topic:'como manter a água dos riachos limpa',f:[['peguei água turva','Água da parte que corre é mais limpa que a parada.'],['derrubei o balde no riacho','Andar devagar na margem molhada evita escorregar.'],['peguei água cheia de folhas','Tirar as folhas da nascente mantém a água limpa.']]}
};
const FRUITC=['#e8433f','#ff9d2e','#f4d23c','#a24fd0'];
const WIKI={natureza:['Fruticultura','Polinização','Adubo','Árvore frutífera','Compostagem'],construcao:['Tijolo','Adobe','Taipa de pilão','Telhado','Alvenaria'],carpintaria:['Carpintaria','Marcenaria','Madeira','Serrote'],pedra:['Granito','Rocha','Cantaria','Quartzo'],culinaria:['Geleia','Pão','Conservação de alimentos','Fermentação'],ciencia:['Método científico','Ciclo da água','Fotossíntese','Gravidade'],arte:['Pigmento','Melodia','Tinta','Escultura'],saude:['Planta medicinal','Camomila','Hortelã','Higiene'],agua:['Nascente','Mata ciliar','Filtração','Cachoeira']};

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
  else if(cnt(type)>=facLimit())return false;
  if(!spot){const hh=home(s);spot=findSpot(hh?hh.x:0,hh?hh.y+1:1);if(!spot)return false}
  for(const[r,v]of Object.entries(b.cost))S.res[r]-=v;
  const nb={id:S.nextId++,type,x:spot.x,y:spot.y,owner:s.id,at:Date.now()};
  S.buildings.push(nb);if(b.home)s.home=nb.id;indexB();
  log(`${s.name} construiu: ${b.n}.`);return true;
 }
 function autoBuild(){
  for(const s of S.slimes){const h=home(s);for(const t of Object.keys(B).filter(t=>B[t].home).sort((a,b)=>B[b].lv-B[a].lv)){if(h&&B[h.type].lv>=B[t].lv)break;if(build(s,t))return}}
  if(S.slimes.some(s=>!s.home))return;
  for(const t of Object.keys(B)){if(B[t].home||cnt(t)>=facLimit())continue;const s=S.slimes.find(x=>qualifies(x,t));if(s&&build(s,t))return}
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
  if(r.frutas+r.refeicoes*2<n*6)nd.natureza+=2;
  if(r.madeira<15)nd.carpintaria+=1.5;
  if(r.pedra<12)nd.pedra+=1;
  if(r.agua<10)nd.agua+=.8;
  if(r.frutas>20&&r.refeicoes<n*2)nd.culinaria+=.8;
  if(S.slimes.some(x=>{const h=home(x);return!h||B[h.type].lv<2}))nd.construcao+=1;
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
  if(d==='culinaria'&&S.res.frutas<1){s.w[d]=Math.max(.2,s.w[d]-.3);return}
  let p=.3+.62*sk/(sk+25)+Math.min(.08,(S.res.ferramentas||0)*.004)-((S.res.frutas+S.res.refeicoes)<=.01?.12:0);
  if(d==='saude'||d==='ciencia'||d==='arte')p+=.05;
  if(Math.random()<p){
   let txt='';const hz=has('horta')?1.3:1;
   if(d==='natureza'){const v=2.5*r*hz;add('frutas',v);add('mudas',.3);txt=`+${fmt(v)} frutas`}
   else if(d==='construcao'){const v=1.2*r;add('tijolos',v);txt=`+${fmt(v)} tijolos`}
   else if(d==='carpintaria'){if(has('oficina')&&S.res.madeira>=4&&Math.random()<.4){S.res.madeira-=3;add('ferramentas',1);txt='fiz uma ferramenta!'}else{const v=2*r;add('madeira',v);txt=`+${fmt(v)} madeira`}}
   else if(d==='pedra'){const v=1.6*r;add('pedra',v);txt=`+${fmt(v)} pedras`}
   else if(d==='culinaria'){const f=Math.min(S.res.frutas,2);S.res.frutas-=f;const v=f*(has('cozinha')?2:1.3)*Math.min(2,r);add('refeicoes',v);txt=`+${fmt(v)} refeições`}
   else if(d==='ciencia'){const o=S.slimes.filter(x=>x!==s);if(o.length){const t=pick(o);gain(t,profOf(t)||'ciencia',.35*mult);txt=`ensinei algo a ${t.name}!`}else{gain(s,'ciencia',.2);txt='descobri algo!'}}
   else if(d==='arte'){const v=.7*r*(has('atelie')?2:1);add('arte',v);txt=`+${fmt(v)} arte`}
   else if(d==='saude'){if(has('enfermaria')&&S.res.ervas>=2&&Math.random()<.5){S.res.ervas-=2;add('remedios',1);txt='fiz um remédio!'}else{const v=1.3*r;add('ervas',v);txt=`+${fmt(v)} ervas`}}
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
 function step(last){
  const n=S.slimes.length,tools=1+Math.min(.5,(S.res.ferramentas||0)*.02);
  const hungry=S.res.frutas+S.res.refeicoes<=0.01;
  const M=tools*(hungry?.5:1+Math.min(.3,(S.res.arte||0)/200+(has('praca')?.1:0)+(S.res.remedios>1?.05:0)));
  add('frutas',.7*Math.min(n,fruitTrees/2+1)*(has('horta')?1.3:1)*M);
  add('madeira',.15*n*M);
  const nd=needs();
  for(const s of S.slimes.slice())doTask(s,nd,last);
  let need=.35*n;const meals=Math.min(S.res.refeicoes,need/2);S.res.refeicoes-=meals;need-=meals*2;S.res.frutas=Math.max(0,S.res.frutas-need);
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

const Mundo={DOMS,DK,RES,B,TASK,ENC,WIKI,NAMES,FRUITC,MAXS,Engine,newState,total,level,profOf,profName,detect,h2,vn,fbm,fmt};
if(typeof module!=='undefined'&&module.exports)module.exports=Mundo;else root.Mundo=Mundo;
})(typeof window!=='undefined'?window:globalThis);
