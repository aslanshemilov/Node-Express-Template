/*
* @Author: Nokey
* @Date:   2016-09-22 17:35:08
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-02-07 18:25:51
*/

'use strict';

/**
 * Redis cache
 */
var redis = require('./redisClient');
var logger = require('./logger');

// Set string value | expire(second)
function set(key, value, expire, cb){
  if(typeof expire === 'function'){
    cb = expire;
    expire = null;
  }
  // value = JSON.stringify(value);
  if(!!expire){
    redis.setex(key, expire, value, cb);
  }else{
    redis.set(key, value, cb);
  }
  logger.info('Cache: '+key);
}
exports.set = set;

// Get string value
function get(key, cb){
  redis.get(key, (err, data)=>{
    if(err){
      return cb(err);
    }
    if(!data){
      return cb();
    }
    // data = JSON.parse(data);
    logger.info('Get Cache: '+key);
    cb(null, data);
  });
}
exports.get = get;