/*
 * @Author: Nokey
 * @Date:   2016-09-23 16:34:44
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-10 18:39:37
 */

'use strict';

/**
 * logger.trace('Entering cheese testing');
 * logger.debug('Got cheese.');
 * logger.info('Cheese is Gouda.');
 * logger.warn('Cheese is quite smelly.');
 * logger.error('Cheese is too ripe!');
 * logger.fatal('Cheese was breeding ground for listeria.');
 */

let log4js = require('log4js')
let config = require('../config')

let log_level = config.debug ? 'debug' : 'info'

log4js.configure({
    appenders: {
        errLog: {
            type: 'dateFile',
            filename: config.logErrorFile,
            alwaysIncludePattern: true,
            pattern: '.yyyy-MM-dd',
            compress: true
        },
        infoLog: {
            type: 'dateFile',
            filename: config.logInfoFile,
            alwaysIncludePattern: true,
            pattern: '.yyyy-MM-dd',
            compress: true
        }
    },
    categories: {
        errLog: { appenders: ['errLog'], level: 'error' },
        infoLog: { appenders: ['infoLog'], level: log_level },
        default: { appenders: ['infoLog', 'errLog'], level: 'trace' }
    },
    pm2: true
})

module.exports = log4js