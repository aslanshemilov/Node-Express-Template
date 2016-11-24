/*
 * Config
 */

var 
    env = process.env.NODE_ENV;

var config = {
  debug: true,

  // Default URL Allow Origin
  defaultOrigin: 'http://www.cctvnews.cn',

  // Mongodb config
  mongodbTest: 'mongodb://name:pwd@localhost:27017/test',

  // Redis config
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: 'pwd',
};

module.exports = config;