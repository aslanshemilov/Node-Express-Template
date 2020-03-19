### Node.js Express Template：基于 Node 的MVC框架模版

### 特性：

1. ​基础架构 **PM2** + **Express** + **Mongodb** + **Redis**;
2. **CORS** 控制；
3. **PM2** 配置管理部署；
4. **Mocha** 单元测试，生成网页报告 /test/reports；
5. **Gzip**；
6. 网页模版使用的 **ejs**；
7. **log4js** 日志系统，统一记录在/logs文件夹下；
8. 基于 **Passport.js** 的用户注册登陆系统；

### 命令：
```bash
npm start
npm test

# 安装mongodb
sudo touch /etc/yum.repos.d/mongodb-org-4.2.repo
    [mongodb-org-4.2]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
    
sudo yum install -y mongodb-org
# 启动mongodb
sudo systemctl start mongod || sudo mongod -f /etc/mongod.conf
# 查看mongodb状态
sudo systemctl status mongod
# 开机启动mongodb
sudo systemctl enable mongod
# 停止mongodb
sudo systemctl stop mongod || sudo mongod -f /etc/mongod.conf  --shutdown

# 安装最新版Redis
yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
yum --enablerepo=remi install redis
# 查看包路径
sudo rpm -ql redis
# 启动 Redis
sudo redis-server /etc/redis.conf

# 手动安装rpm
wget https://url/test.rpm
sudo rpm -ivh test.rpm

# let's encrypt
[certbot](https://certbot.eff.org/lets-encrypt/centosrhel7-other)
```

### 压测（Mac）：
```bash
ab -n 1000 -c 100 http://example.com/get-user
```

### 注意事项：
1. PM2进程管理，实际是单台机器的负载均衡，但是某些共享的有状态的数据（比如第三方获取的Token）就需要用脚本或单独的进程来维护; 或者将公共状态存储在数据库中进行统一管理。