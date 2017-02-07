/*
* @Author: Nokey
* @Date:   2016-09-29 11:44:02
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-01-16 12:44:36
*/

'use strict';

var mongoose          = require('mongoose');
mongoose.Promise      = global.Promise;
var Schema            = mongoose.Schema;
var config            = require('../config.js');
var chinastartup_conn = mongoose.createConnection(config.db_startup);

// Chinastartup conn events
chinastartup_conn.on('error', function(err){
  console.log('Connection error: ' + err);
});
chinastartup_conn.once('connected', function(){
  console.log('MongoDB chinastartup connection successfully!');
});

exports = module.exports = chinastartup_conn;