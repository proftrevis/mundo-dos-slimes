/* Gerado por sim/build-shared.js. Edite sim/_data.js e sim/_engine.js. */
(function(root){
const DOMS={
 natureza:{n:'Natureza e cultivo',p:'Agricultor',c:'#4caf50',kw:'planta arvore fruta semente solo terra flor cultivo colheita horta jardim adubo floresta folha raiz broto muda polinizacao abelha verdura legume plantar regar fotossintese inseto insetos cacar caca grilo besouro gafanhoto mariposa vagalume'},
 construcao:{n:'Construção',p:'Construtor',c:'#d08b3c',kw:'casa construir construcao parede telhado tijolo fundacao arquitetura ponte estrutura cimento argila viga porta janela alicerce obra planta baixa'},
 carpintaria:{n:'Carpintaria',p:'Carpinteiro',c:'#a5683a',kw:'madeira serra prego movel moveis mesa cadeira martelo tabua carpinteiro galho lenha cola entalhe marcenaria verniz'},
 pedra:{n:'Pedras e minerais',p:'Pedreiro',c:'#8b93a1',kw:'pedra rocha mineral cristal geologia granito areia montanha caverna metal ferro cobre ouro quartzo marmore cascalho'},
 culinaria:{n:'Culinária',p:'Cozinheiro',c:'#e5683c',kw:'comida cozinhar receita pao sopa fogo forno sabor tempero mel bolo suco cozinha assar ferver geleia alimento nutricao'},
 ciencia:{n:'Ciência e saber',p:'Sábio',c:'#7a5cf0',kw:'ciencia matematica numero estrela sol lua fisica quimica experimento livro ler escrever historia energia planeta universo gravidade luz tempo calculo pesquisa por que'},
 arte:{n:'Arte e música',p:'Artista',c:'#e0509a',kw:'musica cancao cantar pintura pintar desenho desenhar cor arte danca poesia poema teatro beleza instrumento melodia escultura'},
 saude:{n:'Saúde e cura',p:'Curandeiro',c:'#2fb39b',kw:'saude remedio erva cha doenca cura corpo dormir sono descanso medico cuidar vitamina ferida exercicio higiene respirar'},
 defesa:{n:'Defesa',p:'Guardião da Vila',c:'#c0392b',kw:'defesa defender proteger protecao cerca muro guarda vigia vigiar torre lobo raposa javali perigo fogueira espantalho ataque coragem alarme ronda espantar seguranca'},
 agua:{n:'Água e rios',p:'Guardião das Águas',c:'#2f8cf0',kw:'agua rio riacho cachoeira chuva peixe lago nadar poco irrigacao nascente limpar mar onda gelo vapor ciclo filtrar'}
};
const DK=Object.keys(DOMS);
for(const d of DK)DOMS[d].kws=DOMS[d].kw.split(' ').filter(w=>w.length>2);
const RES={frutas:'Frutas',madeira:'Madeira',pedra:'Pedra',agua:'Água',ervas:'Ervas',tijolos:'Tijolos',mudas:'Mudas',ferramentas:'Ferramentas',refeicoes:'Refeições',insetos:'Insetos',remedios:'Remédios',arte:'Obras de arte'};
const B={
 ninho:{n:'Ninho de folhas',home:1,lv:1,tot:2,req:{},cost:{madeira:2},d:'Primeira moradia, de folhas e galhos caídos.'},
 cabana:{n:'Cabana de madeira',home:1,lv:2,req:{construcao:8},cost:{madeira:12},d:'Uma casinha de verdade.'},
 casa:{n:'Casa de pedra',home:1,lv:3,req:{construcao:25,pedra:8},cost:{madeira:10,pedra:20},d:'Firme e quentinha.'},
 sobrado:{n:'Sobrado',home:1,lv:4,req:{construcao:60},cost:{madeira:25,pedra:30,tijolos:20},d:'Dois andares, com varanda.'},
 casarao:{n:'Casarão',home:1,lv:5,req:{construcao:150},cost:{madeira:60,pedra:60,tijolos:50},d:'Casa grande com jardim, para slimes experientes.'},
 horta:{n:'Horta',req:{natureza:10},cost:{madeira:6},d:'+30% de frutas para todos.'},
 viveiro:{n:'Viveiro de mudas',req:{natureza:25},cost:{madeira:10,agua:10},d:'Planta árvores novas e aumenta a floresta.'},
 oficina:{n:'Oficina',req:{carpintaria:12},cost:{madeira:15},d:'Carpinteiros fazem ferramentas (+produção).'},
 fonte:{n:'Fonte',req:{agua:10},cost:{pedra:10},d:'+50% de água coletada.'},
 cozinha:{n:'Cozinha',req:{culinaria:12},cost:{madeira:10,pedra:5},d:'Cozinheiros rendem mais refeições.'},
 biblioteca:{n:'Biblioteca',req:{ciencia:20},cost:{madeira:20,pedra:10},d:'+25% de conhecimento nas conversas.'},
 atelie:{n:'Ateliê',req:{arte:12},cost:{madeira:10},d:'Artistas criam o dobro de obras.'},
 enfermaria:{n:'Casa de cura',req:{saude:12},cost:{madeira:10,ervas:5},d:'Curandeiros preparam remédios.'},
 cerca:{n:'Cerca de madeira',req:{defesa:10},cost:{madeira:15},d:'Dificulta a entrada dos bichos e diminui o estrago.'},
 fogueira:{n:'Fogueira e espantalho',req:{defesa:16},max:3,cost:{madeira:8,pedra:6},d:'Afasta os bichos: ataques ficam mais raros.'},
 torre:{n:'Torre de vigia',req:{defesa:28},max:2,cost:{madeira:20,pedra:12},d:'Avisa cedo e chama mais slimes para defender.'},
 celeiro:{n:'Celeiro',req:{culinaria:40},max:2,cost:{madeira:60,pedra:40},d:'Guarda comida: as frutas estragam bem menos.'},
 moinho:{n:'Moinho',req:{natureza:60},max:1,cost:{madeira:80,pedra:50},d:'Mói grãos: cozinheiros rendem 50% mais.'},
 escola:{n:'Escola',req:{ciencia:60},max:1,cost:{madeira:80,pedra:60,tijolos:40},d:'Slimes novos nascem sabendo o dobro.'},
 mercado:{n:'Mercado',req:{construcao:80},max:1,cost:{madeira:100,tijolos:80},d:'Troca o que sobra pelo que falta.'},
 observatorio:{n:'Observatório',req:{ciencia:120},max:1,cost:{pedra:150,tijolos:100},d:'Estudam o céu: todos aprendem 15% mais.'},
 ponte:{n:'Ponte',req:{construcao:120},max:1,cost:{madeira:200,pedra:100},d:'Liga as margens: a vila encontra espaço novo mais rápido.'},
 farol:{n:'Farol',req:{defesa:80},max:1,cost:{pedra:200,tijolos:120},d:'Luz forte à noite: os bichos quase não chegam perto.'},
 praca:{n:'Praça',req:{arte:30},cost:{pedra:25},d:'Mais bem-estar para todo mundo.'}
};
const NAMES='Gotinha Lírio Bambu Coral Faísca Pérola Cometa Estrela Trovão Aurora Luar Vagalume Sabiá Ipê Jabuti Caju Pitanga Acerola Jambo Graviola Maracujá Amora Framboesa Kiwi Melado Pudim Paçoca Quindim Brigadeiro Cocada Tapioca Mandioca Pequi Buriti Cajá Umbu Ingá Araçá Cambuci Jabuticaba Goiaba Manga Limão Hortelã Alecrim Sálvia Manjericão Canela Cravo Anis Gengibre Açafrão Baunilha Melissa Camomila Violeta Hortênsia Margarida Girassol Tulipa Orquídea Azaleia Begônia Bolha Anil Celeste Lume Pingo Safira Brisa Orvalho Neblina Cristal Marola Turquesa Índigo Lagoa Chuvisco Geleia Mirtilo Nuvem Riacho Cascata Seixo Garoa Azulão Fofura Musgo Pétala Bruma Sereno Tilápia Jujuba Pipoca Cacau Ameixa Ventinho'.split(' ');
const ENC={
 natureza:['Árvores frutíferas precisam de abelhas para polinizar as flores.','Folhas caídas viram adubo e deixam o solo fértil.','Plantar mudas perto do riacho protege a margem da erosão.','A raiz das árvores segura a terra quando chove forte.','Frutas maduras podem guardar sementes para plantar de novo.'],
 construcao:['Uma boa fundação deixa a casa firme no chão.','Telhados inclinados deixam a chuva escorrer.','Argila misturada com palha vira tijolo quando seca ao sol.','Construir longe da margem do rio evita enchentes em casa.','Janelas viradas para o sol deixam a casa clara e quente.'],
 carpintaria:['Galhos caídos podem virar madeira sem cortar árvores vivas.','Madeira seca é mais leve e racha menos.','Encaixes bem feitos seguram móveis sem pregos.','Lixar a madeira deixa a superfície lisa.','Cada tipo de madeira tem uma dureza diferente.'],
 pedra:['O granito é uma rocha muito dura, ótima para construir.','Pedras do riacho ficam arredondadas pela água.','Areia é feita de pedrinhas muito pequenas.','Cristais crescem devagar dentro das rochas.','Pedras guardam calor do sol durante o dia.'],
 culinaria:['Ferver a água deixa ela segura para beber.','Frutas cozidas com mel viram geleia.','O pão cresce porque o fermento solta gás.','Temperos com ervas deixam a comida mais gostosa.','Comer frutas variadas dá energia e saúde.'],
 ciencia:['O Sol é uma estrela e nos dá luz e calor.','A Lua muda de forma porque vemos partes iluminadas dela.','A água evapora, vira nuvem e volta como chuva.','A gravidade faz as frutas caírem das árvores.','As plantas usam a luz do Sol para fazer o próprio alimento.'],
 arte:['Misturar azul com amarelo faz verde.','Música é feita de ritmo, melodia e harmonia.','Pigmentos podem ser feitos com frutas e terra colorida.','Dançar junto deixa a comunidade feliz.','Poemas brincam com o som das palavras.'],
 saude:['Dormir bem ajuda o corpo a se recuperar.','Chá de camomila acalma e ajuda a descansar.','Lavar ferimentos com água limpa evita infecções.','Beber água todo dia mantém o corpo saudável.','Hortelã ajuda na digestão.'],
 defesa:['Raposas fogem de barulho e de luz.','Javalis atacam em linha reta; desviar para o lado é mais seguro.','Lobos andam em grupo e têm medo de fogo.','Uma cerca bem fechada protege a comida guardada.','Quem vigia de um lugar alto vê o perigo chegando mais cedo.'],
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
 defesa:{v:'fazendo ronda',spot:'T',topic:'como proteger uma vila de animais selvagens sem machucá-los',f:[['me assustei com um barulho à toa','Nem todo barulho é perigo; olhar com calma antes de correr.'],['deixei um buraco na cerca','Conferir a cerca toda ajuda a achar os buracos.'],['dormi durante a vigia','Vigiar em turnos deixa todo mundo descansado.']]},
 agua:{v:'buscando água',spot:'W',topic:'como manter a água dos riachos limpa',f:[['peguei água turva','Água da parte que corre é mais limpa que a parada.'],['derrubei o balde no riacho','Andar devagar na margem molhada evita escorregar.'],['peguei água cheia de folhas','Tirar as folhas da nascente mantém a água limpa.']]}
};
const BUGS={
 grilo:{n:'grilo',c:'#7cb342',food:1.2,ag:.25,w:4,f:['o grilo pulou para longe','Grilos sentem a vibração do chão; chegar bem devagar ajuda.']},
 besouro:{n:'besouro',c:'#4e342e',food:1.6,ag:.08,w:3,f:['o besouro se escondeu debaixo de uma folha','Besouros se escondem sob folhas e cascas; vale olhar embaixo delas.']},
 gafanhoto:{n:'gafanhoto',c:'#9ccc65',food:1.8,ag:.32,w:2,f:['o gafanhoto deu um salto enorme','Gafanhotos saltam para a frente; chegar por trás funciona melhor.']},
 mariposa:{n:'mariposa',c:'#d7ccc8',food:1,ag:.38,w:2,fly:1,f:['a mariposa voou bem alto','Mariposas voam devagar ao entardecer, quando é mais fácil pegá-las.']},
 vagalume:{n:'vaga-lume',c:'#ffe066',food:2.2,ag:.45,w:1,fly:1,water:1,f:['o vaga-lume apagou e sumiu','Vaga-lumes piscam em ritmo; esperar a próxima piscada mostra onde estão.']}
};
TASK.caca={v:'caçando insetos',spot:'T',topic:'',f:[]};
const PRED={
 raposa:{n:'raposa',art:'uma',ele:'Ela',c:'#e07b39',hp:3,str:6,minN:1,w:5,leva:['frutas','insetos'],perda:.25,medo:0,f:['a raposa pegou uma fruta e correu','Raposas fogem de barulho e de luz; bater palmas espanta.']},
 javali:{n:'javali',art:'um',ele:'Ele',c:'#6d4c3d',hp:5,str:14,minN:3,w:3,leva:['madeira','tijolos','frutas'],perda:.2,medo:1,f:['o javali veio correndo direto em mim','Javalis atacam em linha reta; desviar para o lado é mais seguro.']},
 lobo:{n:'lobo',art:'um',ele:'Ele',c:'#8a8f99',hp:8,str:22,minN:6,w:1,leva:['refeicoes','insetos','frutas'],perda:.3,medo:3,f:['o lobo uivou e eu travei de medo','Lobos têm medo de fogo; uma tocha acesa ajuda a afastá-los.']}
};
const FRUITC=['#e8433f','#ff9d2e','#f4d23c','#a24fd0'];
const WIKI={defesa:['Cerca','Torre de vigia','Espantalho','Lobo-cinzento','Javali'],natureza:['Fruticultura','Polinização','Adubo','Árvore frutífera','Compostagem'],construcao:['Tijolo','Adobe','Taipa de pilão','Telhado','Alvenaria'],carpintaria:['Carpintaria','Marcenaria','Madeira','Serrote'],pedra:['Granito','Rocha','Cantaria','Quartzo'],culinaria:['Geleia','Pão','Conservação de alimentos','Fermentação'],ciencia:['Método científico','Ciclo da água','Fotossíntese','Gravidade'],arte:['Pigmento','Melodia','Tinta','Escultura'],saude:['Planta medicinal','Camomila','Hortelã','Higiene'],agua:['Nascente','Mata ciliar','Filtração','Cachoeira']};

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
const UNSAFE=/(morte|morre|mort[oa]s?\b|matou|matar|acidente|nuclear|radia|reator|guerra|bomba|arma\b|armas|assassin|homic|suic|crime|criminos|drog|sexo|sexual|estupr|terror|violen|tortur|massacre|explos|cadaver|evacua|abuso|sequestr|genocid|nazis|escrav|pornogr|alcool|cigarr|tabaco|aposta|cassino|politic|eleic|partido|religi|resid(uo|uos)\b)/;
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

function Engine(S){
 S.queue=S.queue||[];for(const x of S.slimes){const cap=Math.round(total(x)+40+S.slimes.length*3);if(!x.nextSplit||x.nextSplit>cap)x.nextSplit=cap}
 S.queue=S.queue||[];if(S.seasonIdx===undefined)S.seasonIdx=clock(S.steps).si;
 for(const x of S.slimes){x.facts=x.facts.filter(f=>safeText(f.f));x.chat=x.chat.filter(m=>m.r==='u'||safeText(m.t))}
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
  if(has('observatorio'))pts*=1.15;
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
  const inh=has('escola')?.3:.15;for(const d of DK)if(s.k[d])c.k[d]=Math.round(s.k[d]*inh*10)/10;
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
  const b=S.bounds;if(treeCount>(b.x1-b.x0-1)*(b.y1-b.y0-1)*.3)return false;
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
  const tw=Math.min(240,28+Math.round(n*1.6)),th=Math.min(120,26+Math.round(n*.5));
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
  const n=S.slimes.length,cap=Math.min(20,4+n+Math.floor(treeCount/30));
  for(const b of S.bugs)b.age++;
  S.bugs=S.bugs.filter(b=>b.age<60);
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
  const cand=S.buildings.filter(b=>B[b.type]&&!B[b.type].home&&(b.nv||1)<5);if(!cand.length)return;
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
 const vbonus=()=>Math.min(.6,S.buildings.reduce((a,b)=>a+((b.nv||1)-1),0)*.01);
 function step(last){
  const n=S.slimes.length,tools=1+Math.min(.5,(S.res.ferramentas||0)*.02);
  const hungry=S.res.frutas+S.res.refeicoes+S.res.insetos<=0.01;
  spawnBugs();
  S.alerta*=.97;S.threat=Math.max(0,S.threat-.004);
  let busy=[];if(S.pred)busy=predStep(last)||[];else predSpawn();
  const low=S.res.frutas+S.res.insetos+S.res.refeicoes*2<n*4;
  const ck=clock(S.steps);
  if(ck.si!==S.seasonIdx){S.seasonIdx=ck.si;log(['A primavera chegou! Flores por toda parte e muitos insetos voando.','Chegou o verão: as árvores estão carregadas de frutas.','O outono chegou: as folhas caem e os slimes começam a guardar comida para o inverno.','O inverno chegou: as árvores quase não dão frutas. Hora de usar a comida guardada!'][ck.si])}
  const M=(ck.night?.6:1)*(1+vbonus())*tools*(hungry?.5:1+Math.min(.3,(S.res.arte||0)/200+(has('praca')?.1:0)+(S.res.remedios>1?.05:0)));
  add('frutas',.7*Math.min(n,fruitTrees/2+1)*(has('horta')?1.3:1)*M*ck.season.fr);
  S.res.frutas*=has('celeiro')?(cnt('celeiro')>1?.99995:.9999):ck.si===1?.9993:.9996;
  add('madeira',.15*n*M);
  const nd=needs();
  for(const s of S.slimes.slice()){if(busy.includes(s))continue;if(s.scared>0){s.scared--;if(last){s.task=null;if(!s.say||!/medo/.test(s.say))s.say='Ainda estou com um pouquinho de medo…'}continue}if(S.bugs.length&&Math.random()<(low?.35:.1)&&hunt(s,last))continue;doTask(s,nd,last)}
  let need=.35*n*(ck.si===3?1.15:1);const meals=Math.min(S.res.refeicoes,need/2);S.res.refeicoes-=meals;need-=meals*2;const bi=Math.min(S.res.insetos,need*.5);S.res.insetos-=bi;need-=bi;S.res.frutas=Math.max(0,S.res.frutas-need);
  if(n>1&&Math.random()<.3){const a=pick(S.slimes),b=pick(S.slimes);if(a!==b){const[t,l]=level(a)>=level(b)?[a,b]:[b,a],d=profOf(t);if(d)gain(l,d,.3*(has('biblioteca')?1.25:1))}}
  if(hungry&&ck.si===3&&Math.random()<.05){const x=pick(S.slimes);if(addFact(x,'culinaria','Lição: Guardar comida no outono ajuda a passar o inverno.'))log(`${x.name} sentiu fome no inverno e aprendeu: guardar comida no outono ajuda a passar o inverno.`)}
  if(has('viveiro')&&S.res.mudas>=1&&Math.random()<.3&&plantTree()){S.res.mudas-=1;log('Uma muda nova foi plantada na floresta.')}
  S.steps=(S.steps||0)+1;
  if(S.steps%3===0){autoBuild();checkExpand()}
  if(S.steps%15===0)upgrade();
  if(S.steps%10===0&&has('mercado'))market();
 }
 function run(steps){for(let i=0;i<steps;i++)step(i===steps-1);for(const k in S.res)S.res[k]=Math.round(Math.max(0,S.res[k])*100)/100}
 function answer(s,text){
  const t=norm(text).trim(),n=S.slimes.length,ck=clock(S.steps),r=S.res;
  const isQ=/\?\s*$/.test(text.trim())||/^(o que|oque|como|por que|porque|pq|quem|onde|quando|qual|quais|quanto|sera|voce sabe|me (diz|fala|conta))\b/.test(t);
  if(isQ&&/(email|e-mail|telefone|celular|whats|endereco|onde (ele|ela|fulano|voce)? ?mora|senha|cpf|\bip\b|\buid\b|quem (te )?(falou|disse|mandou|escreveu|conversou)|quem esteve|outras pessoas|outros visitantes|nome (dele|dela|de quem)|dados)/.test(t))
   return 'Isso eu não conto! O que os visitantes falam comigo e os dados de cada um ficam bem guardadinhos. Mas posso contar coisas da floresta!';
  if(/^(oi+|ola|ole|eai|e ai|bom dia|boa tarde|boa noite|hey|salve)\b/.test(t)&&t.length<25)
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
  pushChat(s,{r:'u',t:text,a:author});
  const g0=total(s),mult=has('biblioteca')?1.25:1;
  let reply=rude?'Opa, vamos conversar com gentileza? Slimes ficam tristinhos com palavras feias.':safeText(text)?answer(s,text):'Hmm, esse assunto não é para slimes. Vamos falar da floresta, da vila ou de como construir coisas?';
  const hits=detect(text),ds=Object.keys(hits).sort((a,b)=>hits[b]-hits[a]);
  if(reply){if(ds.length)gain(s,ds[0],.5*mult);else gain(s,profOf(s)||pick(DK),.3)}
  else if(!ds.length){reply=pick(['Hihi, que legal conversar com você! Me ensina alguma coisa sobre a floresta, a água ou como construir uma casinha?','Hmm… não entendi tudo, mas gostei! Você sabe como as árvores dão frutas?','Eu adoro ouvir você! Pode me perguntar coisas também, tipo o que estou fazendo ou o que a vila precisa.']);gain(s,profOf(s)||pick(DK),.5)}
  else{
   const f=text.trim().replace(/\s+/g,' ');
   reply=`Que legal, ${author}! Vou guardar isso na minha gelatina e praticar: “${f.length>90?f.slice(0,90)+'…':f}”. Me conta mais sobre ${DOMS[ds[0]].n.toLowerCase()}?`;
   addFact(s,ds[0],f.slice(0,200));
   gain(s,ds[0],Math.min(5,1+ds.reduce((a,d)=>a+hits[d],0)+(f.length>60?1:0))*mult);
   s.focus={d:ds[0],n:12};s.w[ds[0]]=(s.w[ds[0]]||1)+1.5;
  }
  if(scrubbed)reply+=' (Tirei da conversa os contatos e dados pessoais que você escreveu, para te proteger.)';
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
 return{S,T,inB,isWet,home,has,needs,run,talk,clock:()=>clock(S.steps),learnResearch,localResearch,researchPlan,log,get fruitTrees(){return fruitTrees},get treeCount(){return treeCount}};
}

const Mundo={DOMS,DK,RES,B,TASK,BUGS,PRED,ENC,WIKI,NAMES,FRUITC,MAXS,Engine,newState,total,level,profOf,profName,detect,clean,safeText,clock,SEASONS,DAYSTEPS,words,h2,vn,fbm,fmt};
if(typeof module!=='undefined'&&module.exports)module.exports=Mundo;else root.Mundo=Mundo;
})(typeof window!=='undefined'?window:globalThis);
