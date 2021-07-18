const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = (author,keyword) => {
  let sql = `select * from blog where 1=1 `
  if(author){
    sql += `and author='${author}'`
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql); 
}  
const getDetail = (id) => {
  let sql = `select * from blog where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  });
}
const newBlog = (blogData={}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const {author} = blogData
  const createtime = Date.now() 
  let sql = `insert into blog (title, content, author,createtime) 
              values ('${title}', '${content}','${author}',${createtime});
  `
  return exec(sql).then(insertData=> {
    return {
      id: insertData.insertId
    }
  })
}
const updateBlog = (id, blogData={}) => {
  const {title,content} = blogData
  const sql = `
    update blog set title='${title}', content='${content}' where id=${id};
  `
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0){
      return true;
    }
    return false
  })
}
const delBlog = (id, author) => {
  const sql = `
    delete from blog where id=${id} and author='${author}';
  `
  return exec(sql).then(delData => {
    if(delData.affectedRows > 0){
      return true;
    }
    return false
  }) 
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}