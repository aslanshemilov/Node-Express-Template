/*
 * @Author: Nokey
 * @Date:   2016-09-29 11:44:02
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-10 15:17:17
 */

'use strict';

let config    = require('../config')
let log       = require('./logger').getLogger('infoLog')
let mongoose  = require('mongoose')
let Schema    = mongoose.Schema
let test_conn = mongoose.createConnection(config.db_myapp)

// test conn events
test_conn.on('error', (err)=>{
    log.error('Connection error: ' + err)
})

test_conn.once('connected', ()=>{
    log.info('MongoDB test connection successfully!')
})

exports = module.exports = test_conn