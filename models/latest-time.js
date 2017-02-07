/*
* @Author: Nokey
* @Date:   2016-08-01 20:49:03
* @Last Modified by:   Nokey
* @Last Modified time: 2016-11-02 19:09:50
*/
'use strict';

var chinastartup_conn = require('./mongoClient.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LatestdateSchema = new Schema({
  'desc'     : { type: String },
  'timestamp': { type: Date }
});

chinastartup_conn.model('LatestDate', LatestdateSchema);

exports = module.exports = chinastartup_conn.model('LatestDate');