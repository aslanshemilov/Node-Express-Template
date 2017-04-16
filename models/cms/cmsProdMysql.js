/*
* @Author: Nokey
* @Date:   2016-11-04 14:20:40
* @Last Modified by:   Nokey
* @Last Modified time: 2016-11-04 16:03:28
*/

'use strict';

var mysql  = require('mysql');
var colors = require('colors');
var config = require('../config.js');

var cmsProdPool = mysql.createPool({
  connectionLimit : config.cms_mysql_limit,
  host            : config.cms_mysql_host,
  user            : config.cms_mysql_user,
  password        : config.cms_mysql_pwd,
  database        : config.cms_mysql_db,
  charset         : config.cms_mysql_charset
});

var conn_num = 0;
cmsProdPool.on('connection', (conn)=>{
  console.log(colors.yellow('Prod mysql conn: ' + (++conn_num)));
});

var cmsProdQuery = (sql, vals, cb)=>{
  if(typeof vals === 'function'){
    cb = vals;
  }

  cmsProdPool.getConnection((conn_err, conn)=>{
    if(conn_err){
      cb(conn_err, null, null);
    }else{
      conn.query(sql, vals, (sql_err, results, fields)=>{
        if(sql_err){
          conn.release();
          console.log(colors.yellow('Prod mysql conn: ' + (--conn_num)));

          cb(sql_err, null, null);
        }else{
          conn.release();
          console.log(colors.yellow('Prod mysql conn: ' + (--conn_num)));

          cb(sql_err, results, fields);
        }
      });
    }
  });
}

exports = module.exports = cmsProdQuery;