# mysql
- 关系型数据库
- mysql下载安装
- mysql workbench下载安装
## 命令
- show databases; 显示所有数据库
- create schema `myblog`; 创建数据库
- 创建用户表
create table `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`);
)
- 创建博客表
create table `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`);
)
- 操作数据库
1. use myblog;
2. -- show tables; 
## 增
insert into user (username,`password`,realname) values ('zhangsan','123','李四'); 
### 查
select * from users; //查所有
select id,username from users; //查询部分
select * from users where username='zhangsan'; //条件查询
select * from users where username='zhangsan' and `password`='123'; // 和
select * from users where username='zhangsan' or `password`='123'; // 或
select * from users where username like '%zhang%'; //模糊查询
select * from users where `password` like '%1%' order by id desc; //倒序
### 改
update users set realname='李四2' where username="lisi";
SET SQL_SAFE_UPDATES=0; 设置安全模式
### 删除
delete from users where username='lisi';
### 软删除
select * from users where state='1';
update users set state='0' where username='lisi';
select * from users where state <>'0'; //不等于

## blog表
-- insert into blog (title,content,createtime,author) values ('标题A','内容A',1586065014039,'zhangsan');
-- insert into blog (title,content,createtime,author) values ('标题B','内容B',1586065072143,'lisi');
-- select * from blogs order by createtime desc;
-- select * from blogs where author='lisi';
-- select * from blogs where title like '%A%';
-- select * from blogs;
-- select version();
