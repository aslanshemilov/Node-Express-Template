/*
 * @Author: Nokey 
 * @Date: 2016-11-10 11:50:22 
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-10 11:54:42
 */
'use strict'; 

var express = require('express');
var router  = express.Router();

router.get('/api/interface-1', (req, res, next)=>{
  res.end('interface-1');
})

module.exports = router;