const http = require('http');
http.createServer((req,res) => {

  //模拟日志
  console.log('cur time', Date.now())
  //模拟错误
  console.error('模拟报错', Date.now())

  // 模拟程序崩溃
  if(req.url === '/err'){
    throw new Error('出错了')
  }
  res.setHeader('Content-type','application/json')
  res.end(JSON.stringify({
    errno:0,
    msg:'pm2 test server 3'
  }))
}).listen(8000, () =>{
  console.log('listenting 8000')
})