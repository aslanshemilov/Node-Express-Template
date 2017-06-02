/*
 * @Author: Nokey
 * @Date:   2016-09-23 16:34:44
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 16:59:38
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

// TODO: need migrate into v2.x, seprate diff log into log folder
var log4js = require('log4js');
var env = process.env.NODE_ENV;

log4js.configure({
  appenders: [
    {
      type: "console",
      category: "console"
    }
    // {
    //   type: "file",
    //   filename: config.log4jsPath,  // 如果日志文件放到项目文件里，会造成PM2无限重启node进程的陷阱
    //   maxLogSize: 20480,
    //   backups: 10,
    //   category: "cheese"
    // }
  ],
  replaceConsole: true
});

var logger = log4js.getLogger('console'),
    log_level = (env !== 'production') ? 'DEBUG' : 'ERROR';

logger.setLevel(log_level);

module.exports = logger;