const express = require('express')

// 本次http请求的实例
const app = express();

app.use((req,res,next) => {
  console.log('请求开始',req.method,req.url)
  next();
})

app.use((req,res,next) => {
  req.cookie = {
    userId: '123'
  }
  next();
})

app.use((req,res,next) => {
  setTimeout(() => {
    req.body = {
      a: 100,
      b:200
    }
    next();
  })
})

app.use('/api',(req,res,next) => {
  console.log('处理 API')
  next();
})
app.get('/api',(req,res,next) => {
  console.log('处理get API')
  next();
})
app.post('/api',(req,res,next) => {
  console.log('处理post API')
  next();
})

// 模拟登陆
function loginCheck(req,res,next) {
  setTimeout(() => {
    // res.json({
    //   errno:-1,
    //   msg:'登陆失败'
    // })
    console.log('登陆成功')
    next() 
  });
}
app.get('/api/get-cookie',loginCheck,(req,res,next) => {
  console.log('处理get-cookie')
  res.json({
    errno:0,
    data:req.cookie
  })
})
app.post('/api/get-post-data',(req,res,next) => {
  console.log('处理gget-post-data')
  res.json({
    errno:0,
    data:req.body
  })
})
app.use((req,res,next) =>  {
  console.log('处理404')
  res.json({
    errno:0,
    msg:'404 not found'
  })
})
app.listen(3001,() => {
  console.log('listening 3001 ')
})