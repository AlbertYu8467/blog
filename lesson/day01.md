# node的安装
1. 官网下载node包
2. nvm 适用多个node版本
- mac版本nvm安装后无法找到命令[https://www.jianshu.com/p/622ad36ee020]
``` 
brew install nvm
nvm list 查看所有node版本
nvm install v10.13.0 安装指定node版本
nvm use --delete-prefix 10.13.0 切换到指定版本
```
# nodejs = ecmascript + nodejs API
# commonjs 规范 
- require 
- module.exports
`npm init -y`
# node debugger
# 前端和server开发区别
- 服务稳定性
- 内存和cpu
- 日志记录
- 安全
- 集群和服务拆分