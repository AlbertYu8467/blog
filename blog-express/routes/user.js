const {login} = require('../controller/user') 
const {SuccessModel,ErrorModel} = require('../model/resModel')
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const {username, password} = req.body;

  const result = login(username,password)
  return result.then(data => {
    console.log(data.username)
    if(data.username){
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(new SuccessModel('登录成功'))
      return
    }
    res.json(new ErrorModel('登录失败'))
  }) 
});

// router.get('/login-test',(req,res,next) => {
//   if(req.session.username){
//     res.json({
//       errno:0,
//       msg:'登陆成功'
//     })
//     return
//   }
//   res.json({
//     errno:-1,
//     msg:'登陆失败'
//   })
// })

// router.get('/session-test',(req,res,next) => {
//   const session = req.session
//   if(session.viewNum === null){
//     session.viewNum = 0
//   }
//   session.viewNum++
//   res.json({
//     viewNum: session.viewNum
//   })
// })


module.exports = router;
