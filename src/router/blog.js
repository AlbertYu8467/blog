const {getList,getDetail,newBlog,updateBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req,res) => {
 
  // 获取博客列表
  let {method,path} = req;
  let id = req.query.id

  if(method === 'GET' && path === '/api/blog/list'){
    let keyword = req.query.keyword || ''
    let author = req.query.author || ''
    let listData = getList(author,keyword)
    return new SuccessModel(listData)
  }

  //获取博客详情
  if(method === 'GET' && path === '/api/blog/detail'){
    let data = getDetail(id)
    return new SuccessModel(data)

  }

  //新建一篇博客 
  if(method === 'POST' && path === '/api/blog/new'){
    const data = newBlog(req.body);
    return new SuccessModel(data)
  }

  // 更新一篇博客 
  if(method === 'POST' && path === '/api/blog/update'){
    const result = updateBlog(id,req.body)
    if(result) {
      return new SuccessModel()
    }else{
      return new SuccessModel('更新博客失败')
    }
  }
  // 删除一篇博客
  if(method === 'POST' && path === '/api/blog/del'){
    return {
      msg:'这是删除一篇博客的接口'
    }
  }
}
module.exports = handleBlogRouter;