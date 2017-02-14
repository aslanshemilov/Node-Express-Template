/*
 * @Author: Nokey 
 * @Date: 2017-01-25 19:59:57 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-02-07 20:44:27
 */
'use strict'; 

var test_conn = require('../mongoClient.js');
var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var LivePvEverydaySchema = new Schema({
    'pvtime': { type: Date, default: Date.now },
    'pv'    : { type: Number },
    'tag'   : { type: String, default: 'Twice Daily' }
});
LivePvEverydaySchema.index({pvtime: -1});

test_conn.model('LivePvEveryday', LivePvEverydaySchema);
exports = module.exports = test_conn.model('LivePvEveryday');