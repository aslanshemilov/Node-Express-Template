/*
* @Author: Nokey
* @Date:   2016-09-29 11:44:02
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 15:16:02
*/

'use strict';

var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
var Schema       = mongoose.Schema;
var config       = require('../config');
var test_conn    = mongoose.createConnection(config.db_myapp);

// test conn events
test_conn.on('error', function(err){
  console.log('Connection error: ' + err);
});
test_conn.once('connected', function(){
  console.log('MongoDB test connection successfully!');
});

exports = module.exports = test_conn;