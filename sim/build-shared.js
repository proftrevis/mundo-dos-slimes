// Junta os dados e o motor num único arquivo usado pela página e pela automação.
const fs=require('fs'),path=require('path');
const d=fs.readFileSync(path.join(__dirname,'_data.js'),'utf8'),e=fs.readFileSync(path.join(__dirname,'_engine.js'),'utf8'),c=fs.readFileSync(path.join(__dirname,'_civdata.js'),'utf8');
const out=`/* Gerado por sim/build-shared.js. Edite sim/_data.js e sim/_engine.js. */
(function(root){
${d}
${c}
${e}
const Mundo={ERAS,ERAI,DISC,EVENTS,CULT,DOMS,DK,RES,B,TASK,BUGS,PRED,ENC,WIKI,NAMES,FRUITC,MAXS,Engine,newState,wikiSearch,total,level,profOf,profName,detect,clean,safeText,clock,SEASONS,DAYSTEPS,words,h2,vn,fbm,fmt};
if(typeof module!=='undefined'&&module.exports)module.exports=Mundo;else root.Mundo=Mundo;
})(typeof window!=='undefined'?window:globalThis);
`;
fs.writeFileSync(path.join(__dirname,'..','shared.js'),out);
