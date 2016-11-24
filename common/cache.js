/*
* @Author: Nokey
* @Date:   2016-09-22 17:35:08
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-23 14:21:50
*/

'use strict';

/**
 * Redis cache
 */
var redis = require('./redisClient');

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
    cb(null, data);
  });
}
exports.get = get;
