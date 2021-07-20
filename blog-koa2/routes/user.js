const router = require('koa-router')()
const {login} = require('../controller/user') 
const {SuccessModel,ErrorModel} = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const data = await login(username,password)
  if(data.username){
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel('登录成功')
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

// router.get('/session-test', async (ctx, nex) => {
//   if(ctx.session.viewCount === null){
//     ctx.session.viewCount = 0;
//   }
//   ctx.session.viewCount++
//   ctx.body = {
//     errno: 0,
//     viewCount:ctx.session.viewCount
//   }
// })

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
