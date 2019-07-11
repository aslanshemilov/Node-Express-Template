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
var redis = require('./redisClient')
var log = require('./logger').getLogger('infoLog')

/**
 * cache key-value in secends
 *
 * @param {String} key
 * @param {String} value
 * @param {Number} expire
 * @param {Function} cb
 */
function set(key, value, expire, cb) {
    if (typeof expire === 'function') {
        cb = expire
        expire = null
    }
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }

    if (!!expire) {
        redis.setex(key, expire, value, cb)
    } else {
        redis.set(key, value, cb)
    }
    log.debug('Set Cache:', key, value)
}
exports.set = set

// Get string value
function get(key, cb) {
    redis.get(key, (err, data) => {
        if (err) {
            return cb(err)
        }
        if (!data) {
            return cb()
        }

        log.debug('Get Cache: ', key, data)

        cb(null, data)
    })
}
exports.get = get