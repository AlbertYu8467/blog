const mysql = require('mysql')
const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'yuhu2020',
  port:'3306',
  database: 'myblog'
})
// 开始连接
con.connect();

const sql = `select * from user;`
con.query(sql,(err,result) => {
  if(err){
    console.error(err)
    return;
  }
  console.log(result)
})
// 关闭连接
con.end()