/*
* @Author: Nokey
* @Date:   2016-09-23 15:39:11
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 15:16:00
*/

'use strict';

var redis = require('redis');
var config = require('../config');
var logger = require('./logger.js');
var redisClient = redis.createClient({
  host: config.redis_host,
  port: config.redis_port,
  db: config.redis_db,
  password: config.redis_password
});

redisClient.on('error', (err)=>{
  if(err){
    logger.error('Connect to redis error, check your redis config: '+err);
    process.exit(1);
  }
});

redisClient.on('ready', ()=>{
  console.log('Redis is ready!');
});

exports = module.exports = redisClient;