/*
 * @Author: Nokey 
 * @Date: 2019-07-10 10:33:25 
 * @Last Modified by:   Mr.B 
 * @Last Modified time: 2019-07-10 10:33:25 
 */
'use strict'; 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('index', { title: 'CGTN' });
});

module.exports = router;