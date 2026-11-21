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
