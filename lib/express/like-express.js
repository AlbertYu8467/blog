const http = require('http')
const slcie = Array.prototype.slice

class LikeExpress {
  constructor(){
    // 存放中间件的列表
    this.routes = {
      all:[],
      get:[],
      post:[]
    }
  }
  register(path){
    const info = {}
    if(typeof path === 'string'){
      info.path = path;
      // 从第二个参数转换为数组
      info.stack = slcie.all(arguments,1)
    }else{
      info.path = '/'
      info.stack = slcie.all(arguments,0)
    }
    return info
  }

  use(){
    const info = this.register.apply(this,arguments);
    this.routes.all.push(info)
  }

  get(){
    const info = this.register.apply(this,arguments);
    this.routes.get.push(info)
  }

  post(){
    const info = this.register.apply(this,arguments);
    this.routes.post.push(info)
  }
  
  // 核心next机制
  handle(req, res, stack){
    const next = () => {
      // 拿到第一个匹配的中间件
      const middlleware = stack.shift();
      if(middlleware){
        middlleware(req, res, next)
      }
    }
    next();
  }

  match(method, url){
    let stack = [];
    if(url === '/favicon.icon'){

    }

    // 获取routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method ])

    curRoutes.forEach((info) => {
      if(url.indexOf(info.path) === 0){
        // url === '/api/blog/list' 且 info.path === '/' 
        // url === '/api/blog/list' 且 info.path === '/api' 
        stack = stack.concat(info.stack)
      }
    })
    return stack;
  }

  callback(){
    return (req,res) => {
      res.json = (data) => {
        res.setHeader({'Content-Type':'application/json'})
        res.end(JSON.stringify(data));
      }
      const url = req.url;
      const method = req.method.toLowerCase(); 
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen(...args){
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress();
}