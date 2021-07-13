const qs = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {access} = require('./src/utils/log')
const {get, set}  = require('./src/db/redis')
// const SESSION_DATA = {}
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))
  return d.toGMTString();
}

// 处理post data
const getPostData = req => {
  const promise = new Promise((resolve,reject) => {
    if(req.method !== 'POST'){
      resolve({})
      return
    }
    console.log(req.headers)
    if(!req.headers['content-type'].includes('application/json')){
      resolve({})
      return
    }
    let postData = '';
    req.on('data',chunk => {
      postData += chunk.toString();
    })
    req.on('end',() => {
      if(!postData){
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}
const serverHandle = (req,res) => {
  //记录access日志
  access(`${req.method} -- ${req.url} --  ${req.headers['user-agent']} -- ${Date.now()}`)

  res.setHeader('Content-type','application/json')
  let url = req.url;
  req.path = url.split('?')[0]

  // 解析query
  req.query = qs.parse(url.split('?')[1]); 

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item =>{
    if(!item){
      return
    }
    const arr = item.split('=');
    let key = arr[0].trim();
    let value = arr[1].trim();

    req.cookie[key] = value;
  })

  // // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if(userId){
  //   if(!SESSION_DATA[userId]){
  //     SESSION_DATA[userId] = {}
  //   }
  // }else{
  //   needSetCookie = true;
  //   userId = Date.now() +'_'+ Math.random();
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId];

  // 使用redis
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if(!userId){
    needSetCookie = true;
    userId = Date.now() +'_'+ Math.random();
    set(userId,{})
  }
  
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if(sessionData === null){
      set(req.sessionId,{})
      req.session = {}
    }else{
      req.session = sessionData
    }
    return  getPostData(req)
  }).then(postData => {
    req.body = postData;

      // 处理blog路由
    const blogResult = handleBlogRouter(req,res);
    if(blogResult){ 
      if(needSetCookie){
         res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
      }
      blogResult.then(blogData => {
          res.end(JSON.stringify(blogData))
      }) 
      return
    }



    // 处理用户路由
    const userResult = handleUserRouter(req,res)
    if(userResult){
      userResult.then(userData => {
      if(needSetCookie){ 
          res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
       }
        res.end(JSON.stringify(userData))
      })
      return
    }
    res.writeHead(404,{'Content-type':'text/plain'}) 
    res.write('404 Not Found\n')
    res.end()
  }) 
}
module.exports = serverHandle;