const fs = require('fs')

const files=fs.readdirSync('./static/pics')
const l=[]
const types=['png','gif','bmp','jpg','jpeg']
for (let i in files){
    const t=files[i].split(/\./)
    if(t.length>1&&types.some((value)=>value==t[1])){
        l.push(files[i])
    }
}
let temp="const pics=[\n"
for (let i in l){
    temp+="'../static/pics/"+l[i] +"',\n"
}
temp+="]\nexport default pics"
console.log(temp)
fs.writeFile('./src/pictures.js',temp,(err)=>{
    if(err)
    console.log(err)
})