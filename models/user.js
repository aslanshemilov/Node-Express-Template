/*
* @Author: Nokey
* @Date:   2016-09-29 13:38:49
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-01-26 14:19:40
*/
'use strict';

var chinastartup_conn = require('./mongoClient.js');
var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    pwd: {
        type: String
    },
    role: {
        type: String
    }
});
UserSchema.index({name: 1});

chinastartup_conn.model('User', UserSchema);

exports = module.exports = chinastartup_conn.model('User');