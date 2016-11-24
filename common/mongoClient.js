/*
* @Author: Nokey
* @Date:   2016-09-23 16:05:59
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-23 14:01:11
*/

'use strict';

var mongoose = require('mongoose');
var config = require('../config.js');
var conn = mongoose.createConnection(config.mongodbTest);

mongoose.Promise = global.Promise;

// Cctvnews conn events
conn.on('error', function(err){
  console.log('Connection error: ' + err);
});
conn.once('connected', function(){
  console.log('MongoDB cctvnews connection successfully!');
});

exports = module.exports = conn;