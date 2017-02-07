/*
 * @Author: Nokey 
 * @Date: 2017-01-13 16:07:10 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-01-13 16:07:39
 */
'use strict'; 

module.exports = (options)=>{
  // CROS
  var allowOrigin = new RegExp('^http:\/\/(.+\.)*cctvnews\.cn$');
  app.use(function(req, res, next){
    var url = '';
    if(allowOrigin.test(req.headers.origin)){
      url = req.headers.origin;
    }else{
      url = 'http://cctvnews.cn';
    }
    res.set({
      // 'Access-Control-Allow-Origin': url,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST'
    });
    next();
  });
}