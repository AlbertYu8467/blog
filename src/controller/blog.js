const { exec } = require('../db/mysql')
const getList = (author,keyword) => {
  let sql = `select * from blog where 1=1 `
  if(author){
    sql += `and author='${author}'`
  }
  if(keyword){
    sql += `and author='${keyword}'`
  }
  return exec(sql); 
}
const getDetail = (id) => {
  return [
    {id:1,title:'标题A',content:'内容A',createTime:1625497063905,author:'zhangsan'},
  ]
}
const newBlog = (blogData={}) => {
  return {
    id: 3
  }
}
const updateBlog = (id, blogData={}) => {
  return false
}
const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}