const express = require('./like-express')
const app = express();

app.use((req,res,next) => {
  console.log('开始请求...',req.method, req.url)
  next();
})

app.use((req,res,next) => {
  console.log('处理cookie')
  req.cookie = {
    userId: '123'
  }
  next();
})

app.use('/api',(req,res,next) => {
  console.log('处理api请求')
  next();
})

app.get('/api',(req,res,next) => {
  console.log('get /api请求')
  next();
})

function loginCheck(req,res,next){
  setTimeout(() => {
    console.log('登录成功')
    next();
  });
}
app.get('/api/get-cookie', loginCheck, (req,res,next) => {
  console.log('get /api/get-cookie')
  res.json({
    error:0,
    data: req.cookie
  })
})

app.listen(8050, () => {
  console.log('8000 is listening')
})