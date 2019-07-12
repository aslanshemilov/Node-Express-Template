/*
 * @Author: Nokey 
 * @Date: 2019-07-10 16:41:13 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-10 18:18:40
 */
'use strict'; 

let path = require('path')
let utils = require('../utils')
let logErrorPath = path.resolve(__dirname, '../logs/error')
let logInfoPath = path.resolve(__dirname, '../logs/info')

utils.exitDirify(logErrorPath)
utils.exitDirify(logInfoPath)

let config = {
    debug: true,

    // MongoDB
    // db_myapp: 'mongodb://test:test@localhost:27017/test',
    db_myapp: 'mongodb://localhost:27017/test',

    // Redis
    redis_host: '127.0.0.1',
    redis_port: 6379,
    // redis_db: 0,
    // redis_password: '123qwe',

    // log4js
    logErrorFile: logErrorPath + '/err.log',
    logInfoFile: logInfoPath + '/info.log'
}

module.exports = config