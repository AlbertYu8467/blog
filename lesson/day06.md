  # 登录
  - 登录校验
  - 登录存储
  - cookie session redis nigix
  ## cookie 
  1. 5kb
  2. 跨域不共享
  3. 格式：k1=v1;k2=v2;k3=v3; // 追加
  4. 每次发送请求，会将请求域的cookie发送给server
  5. server可以修改cookie返回浏览器
  6. 浏览器也可以通过js修改cookie(有限制)
  document.cookie='k1=v1;' //累加
  httpOnly
  过期时间 expires

  ## session server端存储用户信息 
  cookie放userId, server对应username
  - 解决的问题  客户端存储太危险
  - 实现session
  - session 内存有限
  - 进程数据无法共享 
  ## redis 缓存数据库，数据放内存中
  - 访问数据快
  - 内存小
  - 断电丢失
  - 操作频率高
  1. 安装redis. brew install redis
  2. redis-server
  3. redis-cli
  4. set myname yuhu 
  5. get myname
  6. keys *
  7. del myname
  ## redis fuction
  1. set 
  2. get
  ## 前端联调
  - cookie跨域不共享
  1. npm i http-server
  2. http-server -p 8001

