const qs = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data
const getPostData = req => {
  const promise = new Promise((resolve,reject) => {
    if(req.method !== 'POST'){
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json'){
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
  res.setHeader('Content-type','application/json')
  let url = req.url;
  req.path = url.split('?')[0]

  // 解析query
  req.query = qs.parse(url.split('?')[1]); 

  // 处理postData 
  getPostData(req).then(postData => {
    req.body = postData;

      // 处理blog路由
    const blogResult = handleBlogRouter(req,res);
    if(blogResult){
      blogResult.then(blogData => {
          res.end(JSON.stringify(blogData))
      }) 
      return
    }



    // 处理用户路由
    const userData = handleUserRouter(req,res)
    if(userData){
      res.end(JSON.stringify(userData))
      return
    }
    res.writeHead(404,{'Content-type':'text/plain'}) 
    res.write('404 Not Found\n')
    res.end()
  }) 
}
module.exports = serverHandle;