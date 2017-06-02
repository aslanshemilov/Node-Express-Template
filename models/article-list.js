/*
* @Author: Nokey
* @Date:   2016-08-01 20:49:03
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 14:59:21
*/
'use strict';

var test_conn = require('../common/mongoClient.js');
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

test_conn.model('ArticleList', ArticleListSchema);

exports = module.exports = test_conn.model('ArticleList');