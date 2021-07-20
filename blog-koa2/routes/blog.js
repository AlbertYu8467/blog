const router = require('koa-router')()
const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list',async function (ctx, next) {
  let keyword = ctx.query.keyword || ''
  let author = ctx.query.author || ''
  if(ctx.query.isadmin){
    if(ctx.session.username === null){
      cxt.body = new ErrorModel('未登录');
      return
    }

    author = ctx.session.username;
  }
  const listData = await getList(author,keyword);
  ctx.body = new SuccessModel(listData);
})

router.get('/detail',async function (ctx, next) {
  const data = await getDetail(ctx.query.id); 
  ctx.body = new SuccessModel(data);
})

router.post('/new',loginCheck, async function (ctx, next) {
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
})

router.post('/update',loginCheck, async function (ctx, next) {
  const value = await updateBlog(ctx.query.id,ctx.request.body)
  if(value) {
    ctx.body = new SuccessModel();
  }else{
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.get('/del',loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  const value = await delBlog(ctx.query.id,author)
  if(value) {
    ctx.body = new SuccessModel();
  }else{
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
