const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = async (author,keyword) => {
  let sql = `select * from blog where 1=1 `
  if(author){
    sql += `and author='${author}'`
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return await exec(sql); 
}  
const getDetail =async (id) => {
  let sql = `select * from blog where id='${id}';`
  const rows = await exec(sql);
  return rows[0]
}
const newBlog =async (blogData={}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const {author} = blogData
  const createtime = Date.now() 
  let sql = `insert into blog (title, content, author,createtime) 
              values ('${title}', '${content}','${author}',${createtime});
  `
  const insertData = await exec(sql);
  return {
    id: insertData.insertId
  }
}
const updateBlog =async (id, blogData={}) => {
  const {title,content} = blogData
  const sql = `
    update blog set title='${title}', content='${content}' where id=${id};
  `
  const updateData = await exec(sql);
  if(updateData.affectedRows > 0){
    return true;
  }
  return false 
}
const delBlog =async (id, author) => {
  const sql = `
    delete from blog where id=${id} and author='${author}';
  `
  const delData = await exec(sql);
  if(delData.affectedRows > 0){
    return true;
  }
  return false 
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}