const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

// 统一登录
const loginCheck = req => {
  if(!req.session.username){
    return Promise.resolve(new ErrorModel('登录失败'))
  }
}
const handleBlogRouter = (req,res) => {
 
  // 获取博客列表
  let {method,path} = req;
  let id = req.query.id

  if(method === 'GET' && path === '/api/blog/list'){
    let keyword = req.query.keyword || ''
    let author = req.query.author || ''
    const result = getList(author,keyword);
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  //获取博客详情
  if(method === 'GET' && path === '/api/blog/detail'){
    const result = getDetail(id); 
    return result.then(data => {
      return new SuccessModel(data)
    })

  }

  //新建一篇博客 
  if(method === 'POST' && path === '/api/blog/new'){
    const loginCheckResult = loginCheck(req);
    if(loginCheckResult){
      return loginCheck;
    }
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新一篇博客 
  if(method === 'POST' && path === '/api/blog/update'){
    if(loginCheckResult){
      return loginCheck;
    }
    const result = updateBlog(id,req.body)
    return result.then(value => {
      if(value) {
        return new SuccessModel()
      }else{
        return new ErrorModel('更新博客失败')
      }
    })
  }
  // 删除一篇博客
  if(method === 'POST' && path === '/api/blog/del'){
    if(loginCheckResult){
      return loginCheck;
    } 
    const author = req.session.username;
    const result = delBlog(id,author)
    return result.then(value => {
      if(value) {
        return new SuccessModel()
      }else{
        return new ErrorModel('删除博客失败')
      }
    })
  }
}
module.exports = handleBlogRouter;