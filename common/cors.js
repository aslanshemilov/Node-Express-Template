/*
 * @Author: Nokey 
 * @Date: 2016-11-10 13:36:01 
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-24 11:31:32
 */
'use strict';

var _ = require('lodash');
var config = require('../config.js');

// TODO: test
class CROS{
  constructor(opt){
    let default_opt = {
          origin: '*',
          methods: 'GET, POST, OPTIONS'
        },
        now_opt = _.extend(default_opt, opt),
        o = now_opt.origin;

    this.whiteList = []; // RegExp Obj List

    if(o === '*'){
      this.whiteList.push(new RegExp('.*'));
    }else if(typeof o === 'string'){
      this.whiteList.push(new RegExp(o)); 
    }else if(typeof o === 'object'){
      o.forEach((e)=>{
        this.whiteList.push(new RegExp(e));
      });
    }

    this.methods = now_opt.methods;
  }

  checkOrigin(url){
    this.whiteList.forEach((e)=>{
      if(e.test(url)){
        return true;
      }
    });

    return false;
  }
}

/**
 * opt: config object
 * {
 *    origin : '*',   ex. 'http://www.example.com' or
 *                        '^http:\/\/(.+\.)*cctvnews\.cn$' or
 *                        ['https://www.example.com', '^http:\/\/(.+\.)*cctvnews\.cn$']
 *    methods: 'GET, POST'
 * }
 */
function cors(opt){
  var rule = new CROS(opt);

  return (req, res, next)=>{
    let url = '';

    if(req.headers.origin && rule.checkOrigin(req.headers.origin)){
      url = req.headers.origin;
    }else{
      url = config.defaultOrigin;
    }

    res.set({
      'Access-Control-Allow-Origin': url,
      'Access-Control-Allow-Methods': rule.methods
    });
    next();
  }
};

module.exports = cors;
