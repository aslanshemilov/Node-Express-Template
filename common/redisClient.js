/*
* @Author: Nokey
* @Date:   2016-09-23 15:39:11
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-23 14:12:18
*/

'use strict';

var redis = require('redis');
var config = require('../config.js');
var redisClient = redis.createClient({
  host: config.redis_host,
  port: config.redis_port,
  db: config.redis_db,
  password: config.redis_password
});

redisClient.on('error', (err)=>{
  if(err){
    console.error('Connect to redis error, check your redis config: '+err);
    process.exit(1);
  }
});

redisClient.on('ready', ()=>{
  console.log('Redis is ready!');
});

exports = module.exports = redisClient;