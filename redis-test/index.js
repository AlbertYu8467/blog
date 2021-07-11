const redis = require('redis')

// 创建客户端
const redisClient  = redis.createClient(6379
,'127.0.0.1')
redisClient.on('error', (err)=> {
  console.log(err )
})
redisClient.set('myname','zhangsan',redis.print
)
redisClient.get('myname',(err,value) => {
  if(err){
    console.log(err)
    return
  }
  console.log(value)
  redisClient.quit()
})