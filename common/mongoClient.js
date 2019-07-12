/*
 * @Author: Nokey
 * @Date:   2016-09-29 11:44:02
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-10 15:17:17
 */

'use strict';

const config   = require('../config')
const log      = require('./logger').getLogger('infoLog')
const mongoose = require('mongoose')
const conn     = mongoose.createConnection(config.db_myapp)

// test conn events
conn.on('error', (err)=>{
    log.error('Connection error: ' + err)
})

conn.once('connected', ()=>{
    log.info('MongoDB test connection successfully!')
})

exports = module.exports = conn