const handleUserRouter = (req,res) => {

  // 登录接口
  if(req.method === 'POST' && req.path === '/api/user/login'){
    return {
      msg:'这是登录的接口'
    }
  }
}
module.exports = handleUserRouter;