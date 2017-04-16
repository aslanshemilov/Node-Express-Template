/*
 * @Author: Nokey 
 * @Date: 2017-01-18 15:13:15 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-04-07 14:52:21
 */
'use strict';

var express          = require('express'),
    router           = express.Router(),
    request          = require('request'),
    redis            = require('../common/cache'),
    config           = require('../config'),
    logger           = require('../common/logger'),
    models           = require('../models'),
    ArticleListModel = models.ArticleList;

/**
 * Example Redis
  var key = 'cgtn',
  docs = {a:1, b:2},
  expires_time = 2000;
  
  redis.set(key, JSON.stringify(docs), expires_time, (err, reply)=>{
    if(err){
      logger.error('Cache error: '+err);
    }else{
      logger.info('Cache success!');
    }
  });
 */


/*
 * Ajax Example
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

/*
 * Pagination Example
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