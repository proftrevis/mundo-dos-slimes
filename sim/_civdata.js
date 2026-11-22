// ---- civilização: descobertas, eras, problemas e cultura ----
const ERAS=['Floresta','Aldeia','Vila','Cidade','Era Industrial','Era Moderna','Era Digital','Era Espacial'];
const ERAI=['🌳','🛖','🏡','🏙️','🏭','🚗','💻','🚀'];
// id:[nome, era, requisitos, domínio, custo, efeito]
const DISC={
 fogo:['Fogo',0,[],'culinaria',20,'Cozinhar e espantar bichos.'],
 ferramentas:['Ferramentas de pedra',0,[],'pedra',25,'Trabalhos mais rápidos.'],
 coleta:['Coleta organizada',0,[],'natureza',20,'Mais frutas colhidas.'],
 cordas:['Cordas de cipó',0,[],'carpintaria',25,'Amarrar, puxar e construir.'],
 agricultura:['Agricultura',1,['coleta'],'natureza',60,'Plantar de propósito: muito mais comida.'],
 ceramica:['Cerâmica',1,['fogo'],'construcao',60,'Potes para guardar comida e água.'],
 tijolo:['Tijolo cozido',1,['ceramica'],'construcao',80,'Casas mais firmes.'],
 roda:['Roda',1,['ferramentas','cordas'],'carpintaria',90,'Carroças e moinhos.'],
 ervas_med:['Ervas que curam',1,['coleta'],'saude',60,'Primeiros remédios.'],
 escrita:['Escrita',2,['ceramica'],'ciencia',150,'Guardar o saber em livros.'],
 irrigacao:['Irrigação',2,['agricultura'],'agua',140,'Água chegando às plantações.'],
 metalurgia:['Metalurgia',2,['fogo','ferramentas'],'pedra',170,'Ferramentas de metal.'],
 barco:['Barco',2,['cordas'],'agua',130,'Navegar pelo rio.'],
 musica:['Instrumentos musicais',2,['cordas'],'arte',120,'Festas mais alegres.'],
 matematica:['Matemática',3,['escrita'],'ciencia',300,'Contar, medir e planejar.'],
 engenharia:['Engenharia',3,['matematica','tijolo'],'construcao',380,'Prédios e diques.'],
 moinho_agua:['Moinho de água',3,['roda','irrigacao'],'agua',320,'Força do rio trabalhando.'],
 imprensa:['Imprensa',3,['escrita','metalurgia'],'ciencia',360,'Livros para todos.'],
 astronomia:['Astronomia',3,['matematica'],'ciencia',340,'Estudar as estrelas.'],
 saneamento:['Saneamento',3,['engenharia'],'saude',400,'Água limpa e menos doenças.'],
 vapor:['Máquina a vapor',4,['metalurgia','engenharia'],'ciencia',700,'Fábricas e trens.'],
 eletricidade:['Eletricidade',4,['vapor','matematica'],'ciencia',850,'Luz à noite em toda a vila.'],
 motor:['Motor',4,['vapor'],'carpintaria',800,'Carrinhos que andam sozinhos.'],
 vacinas:['Vacinas',4,['saneamento','imprensa'],'saude',750,'Proteção contra doenças.'],
 aviao:['Avião',5,['motor','engenharia'],'ciencia',1500,'Voar sobre a floresta.'],
 reciclagem:['Reciclagem',5,['saneamento','vapor'],'natureza',1300,'Nada vira lixo.'],
 energia_solar:['Energia solar',5,['eletricidade','astronomia'],'ciencia',1600,'Energia limpa do Sol.'],
 computador:['Computador',6,['eletricidade','matematica'],'ciencia',2600,'Máquinas que pensam rápido.'],
 internet:['Rede de computadores',6,['computador'],'ciencia',3000,'Todas as vilas conversando.'],
 cidade_verde:['Cidade verde',6,['energia_solar','reciclagem'],'natureza',3200,'Crescer sem ferir a floresta.'],
 robos:['Robozinhos ajudantes',6,['computador','motor'],'carpintaria',3400,'Ajudam nos trabalhos pesados.'],
 foguete:['Foguete',7,['aviao','computador'],'ciencia',6000,'Ir além do céu.'],
 satelite:['Satélite',7,['foguete'],'ciencia',7000,'Ver o mundo lá de cima.'],
 estacao_lunar:['Estação na Lua',7,['foguete','cidade_verde'],'construcao',9000,'Uma vila na Lua!']
};
const INV_A=['Moinho','Ponte','Lanterna','Jardim','Máquina','Torre','Barco','Robô','Estufa','Telescópio','Bicicleta','Balão','Trem','Farol','Relógio','Aqueduto','Painel','Ninho','Escada','Elevador'];
const INV_B=['solar','flutuante','de cristal','musical','de vento','que canta','gigante','de bolso','de mel','das estrelas','de folhas','saltitante','de gelatina','das nuvens','de orvalho','arco-íris','de luz','que dança','silencioso','mágico'];
const EVENTS={
 seca:{n:'Seca',i:'☀️',era:1,sol:'irrigacao',dur:900,d:'Pouca chuva: água e frutas rendem metade.'},
 praga:{n:'Praga nas plantações',i:'🐛',era:1,sol:'ervas_med',dur:700,d:'Bichinhos estragam as frutas.'},
 enchente:{n:'Enchente',i:'🌊',era:2,sol:'engenharia',dur:600,d:'O rio subiu e atrapalha os trabalhos.'},
 doenca:{n:'Gripe dos slimes',i:'🤧',era:3,sol:'vacinas',dur:800,d:'Muitos slimes espirrando e trabalhando devagar.'},
 poluicao:{n:'Poluição',i:'🏭',era:4,sol:'reciclagem',dur:1200,d:'Fumaça das fábricas faz mal às plantas.'},
 tempestade:{n:'Tempestade forte',i:'⛈️',era:0,sol:'engenharia',dur:400,d:'Ventania e chuva forte atrapalham o trabalho.'},
 chuva_meteoros:{n:'Chuva de meteoros',i:'☄️',era:7,sol:'satelite',dur:500,d:'Pedrinhas do céu assustam a vila.'},
 apagao:{n:'Apagão',i:'🔌',era:5,sol:'energia_solar',dur:500,d:'Falta energia e tudo fica mais lento.'}
};
const CULT=[['artistas','arte'],['inventores','ciencia'],['agricultores','natureza'],['navegantes','agua'],['construtores','construcao'],['curandeiros','saude'],['cozinheiros','culinaria']];
const VNAMES=['Vila Orvalho','Recanto Azul','Pedra Lisa','Vale das Gotas','Porto Riacho','Bosque Alto','Lagoa Clara','Colina do Sol','Ninho Verde','Campo Lume','Cachoeira Nova','Serra Gelatina'];
const SONGS=['Canção da Chuva','Ciranda do Riacho','Valsa das Gotinhas','Hino da Primeira Fogueira','Toada do Vaga-lume','Samba da Colheita','Cantiga da Lua','Baião do Moinho','Marcha dos Construtores','Acalanto da Floresta'];
