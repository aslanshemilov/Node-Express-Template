/*
 * @Author: Nokey 
 * @Date: 2017-01-18 15:13:15 
 * @Last Modified by:   Nokey 
 * @Last Modified time: 2017-01-18 15:13:15 
 */
'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var models = require('../models');
var ArticleListModel = models.ArticleList;
var LatestDateModel = models.LatestDate;
var config = require('../config.js');

/**
 * Get data from www
 */
var wwwStatus = 'done';
router.get('/startup/get-articles-data-from-www', function(req, res, next){
  if(wwwStatus === 'done'){
    // change wwwStatus into loading
    wwwStatus = 'loading';

    request({
      method: 'GET',
      url: 'http://www.cctvnews.cn/publish/app/special/395977.json'
    }, function(error, response, body){
      // get data successfuly!
      if(!error && response.statusCode == 200){
        let 
          www_json = JSON.parse(body),
          total_articles = www_json.datas[0].newsdatas,
          latest_time,
          new_articles,
          new_articles_num;
        
        // get latest time of current articles list
        let latestdateQuery = LatestDateModel.findOne({ desc: 'latest time' });

        latestdateQuery
          .exec()
          .then(function(doc){
            /**
             * Insert new articles
             */
            latest_time = doc.timestamp.valueOf();
            new_articles = total_articles.filter(function(value) {
              return value.newstime > latest_time;
            });
            // console.log(new_articles);
            if(new_articles.length === 0){
              throw new Error('No new articles.');
            }else{
              new_articles_num = new_articles.length;
              return ArticleListModel.insertMany(new_articles);
            }
          })
          .then(function(docs){  // Insert new articles
            /**
             * Update latest time
             */
            let new_latest_time = 0,
                query = {desc: 'latest time'};

            docs.forEach(function(value, index){
              if(value.newstime > new_latest_time){
                new_latest_time = value.newstime;
              }
            });

            return LatestDateModel.update(query, {timestamp: new_latest_time})
                                  .exec();
          })
          .then(function(writeResult){
            // insert new articles & insert latest time sign
            // console.log('complete update operation...');
            wwwStatus = 'done';
            if(writeResult.nModified === 1){
              res.end('Get '+new_articles_num+' new startup articles & update latest time successfuly!');
            }else{
              res.end('Update latest time failed!');
            }
          })
          .catch(function(err){
            console.error(err);
            wwwStatus = 'done';
            res.status(500).end('Server Error: ' + err.message);
          });

        // TODO: MongoDB 如何处理事务？我在这里先插入新文章，然后更新最新文章时间，
        // 这是两个原子操作，如果第一个操作成功，第二个失败该怎么办？

      }else{
        // request data from www server failed!
        wwwStatus = 'done';
        res.status(500).end(error);
      }
      
    });
  }else{
    res.end('This operation is processing, please wait a moment...');
  } 
});

/*
 * Get home news data
 */
router.get('/startup/get-home-news-data', (req, res, next)=>{
  // get how much news, the default is 11
  var news_num = req.query.newsnum || 11;

  // query
  ArticleListModel
    .find()
    .limit(news_num)
    .sort({ newstime: -1 })
    .select({ _id: 0, id: 1, title: 1, imgurl: 1 })
    .exec()
    .then((docs)=>{
      res.json(docs);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).end('Server Error: ' + err.message);
    });
});

/**
 * Get Article Detail XML
 */
router.get('/startup/get-article-detail-xml', (req, res, next)=>{
  let query = {id: req.query.articleId};

  ArticleListModel
    .findOne(query)
    .exec()
    .then((doc)=>{
      let detailurl = doc.detailurl;

      request({
        method: 'GET',
        url: detailurl
      }, (error, response, body)=>{
        if(!error && response.statusCode == 200){
          res.end(body);
        }else{
          res.status(500).end(error);
        }
      });
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).end('Server Error: ' + err.message);
    });
});

// Test...
router.get('/startup/test-get-xml', (req, res, next)=>{
  request({
    method: 'GET',
    url: 'http://applist.cctvnews.cn/publish/app/data/2016/04/14/1385777/detail.xml'
  }, (error, response, body)=>{
    if(!error && response.statusCode == 200){
      console.log(typeof body);
      res.end(body);
    }else{

      res.status(500).end(error);
    }
  });
});

/*
 * Pagination
 */
router.get('/startup/get-pagination-article-list', (req, res, next)=>{
  let 
      pageNum = req.query.pagenum || 1,
      totalPageNum,
      newsNumPerPage = config.news_num_per_page,
      skipNum;

  ArticleListModel
    .count()
    .exec()
    .then((count)=>{
      // Calculate the total number of page
      totalPageNum = Math.ceil(count / newsNumPerPage);

      // Skip query num
      skipNum = newsNumPerPage * (pageNum - 1);

      /*
       * query request pagenum content
       */
      let paginationContentQuery = ArticleListModel
                                      .find()
                                      .sort({ newstime: -1 })
                                      .skip(skipNum)
                                      .limit(newsNumPerPage)
                                      .select({
                                        _id: 0,
                                        id: 1,
                                        title: 1,
                                        imgurl: 1,
                                        speciallabelcolor: 1,
                                        newstime: 1
                                      });
      
      return paginationContentQuery.exec();
    })
    .then((docs)=>{
      res.json({
        total: totalPageNum,
        data: docs
      });
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).end('Server Error: ' + err.message);
    });
});

module.exports = router;

