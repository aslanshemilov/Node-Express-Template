/*
 * @Author: Nokey 
 * @Date: 2017-01-13 17:11:26 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-01-18 15:19:26
 */
'use strict'; 

var express = require('express');
var router = express.Router();
var models = require('../models');
var UserModel = models.User;
var ArticleListModel = models.ArticleList;

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'CGTN' });
    // UserModel.findOne({name: 'nokey'}, function(err, character){
    //     console.log('character: ', character);
    // });
    // ArticleListModel.find({}, function(err, article){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log('article', article);
    // });
    // var articlelistQuery = ArticleListModel.find({newstime: {$lt: (new Date()).getTime()}});
    
    // articlelistQuery.
    //     limit(10).
    //     sort({ newstime: -1 }).
    //     exec(function(err, articles){
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log('articles', articles);
    //     });
        
    // res.end(req.url);
});

module.exports = router;