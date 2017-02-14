### Node.js Express Template：基于 Node 的MVC框架模版

### 特性：

1. ​基础架构 PM2 + Express + Mongoose + Redis;
2. CORS 控制；
3. Git自动部署钩子；
4. Mocha单元测试，生成网页报告 /test/reports；
5. Gzip；
6. Mongodb客户端推荐使用 MongoChef；
7. 网页模版使用的 ejs；
8. log日志由PM2输出；

### 命令：
```bash
npm start
npm test
```

### 压测（Mac）：
```bash
ab -n 1000 -c 100 http://example.com/get-user
```

### 注意事项：
1. PM2进程管理，实际是单台机器的负载均衡，但是某些共享的有状态的数据（比如第三方获取的Token）就需要用脚本或单独的进程来维护;