const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname,'data.txt')
fs.readFile(fileName,(err,data) =>{
  if(err){
    console.log(err)
    return
  }
  // data是二进制文件，需要转换为字符串
  console.log(data.toString())
})
const content = '这是新写入的内容\n'
const opt = {
  flag:'a' // w
}
fs.writeFile(fileName,content,opt,err => {
  if(err){
    console.log(err)
  }
})

fs.stat(fileName,(err,stats)=> {
  console.log(stats.isFile())
})