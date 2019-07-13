/*
 * @Author: Nokey 
 * @Date: 2019-07-10 10:33:25 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 20:06:58
 */
'use strict'; 

const express = require('express')
const router  = express.Router()

/* GET home page. */
router.get('/home', (req, res, next)=>{
    res.status(200).render('home', { title: 'CGTN' })
})

module.exports = router