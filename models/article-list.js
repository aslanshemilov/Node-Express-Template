/*
* @Author: Nokey
* @Date:   2016-08-01 20:49:03
* @Last Modified by:   Nokey
* @Last Modified time: 2016-11-02 19:09:49
*/
'use strict';

var chinastartup_conn = require('./mongoClient.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleListSchema = new Schema({
    'id'               : { type: Number },
    'videourl'         : { type: String },
    'audiourl'         : { type: String },
    'imgurl'           : { type: String },
    'shareurl'         : { type: String },
    'author'           : { type: String },
    'speciallabel'     : { type: String },
    'speciallabelcolor': { type: String },
    'detailurl'        : { type: String },
    'title'            : { type: String },
    'likenum'          : { type: Number },
    'newstime'         : { type: Date },
    'type'             : { type: Number }
});

ArticleListSchema.index({newstime: -1});

chinastartup_conn.model('ArticleList', ArticleListSchema);

exports = module.exports = chinastartup_conn.model('LatestDate');