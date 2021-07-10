const {login} = require('../controller/user') 
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleUserRouter = (req,res) => {

  // 登录接口
  if(req.method === 'GET' && req.path === '/api/user/login'){
    // const {username, password} = req.body;
    const {username, password} = req.query;

    const result = login(username,password)
    return result.then(data => {
      if(data.username){
        req.session.username = data.username;
        req.session.realname = data.realname;

        return new SuccessModel('登录成功')
      }
      return new ErrorModel('登录失败')  
    }) 
  }

  if(req.method === 'GET' && req.path === '/api/user/login-test'){
    if(req.session.username){
      return Promise.resolve(new SuccessModel({session:req.session}))
    }
    return Promise.resolve(new ErrorModel('登录失败'))
  }
}
module.exports = handleUserRouter;