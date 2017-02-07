/*
 * @Author: Nokey 
 * @Date: 2017-01-18 15:10:31 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-01-18 15:24:02
 */
'use strict'; 

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var execFile = require('child_process').execFile;

/**
 * Github Webhook
 */
var SECRET_TOKEN = '2nr4zl1z3smupnkejxpupiudi';
router.post('/webhook/github-push', (req, res, next)=>{
  // console.log(JSON.stringify(req.headers));
  const hub_signature_arr = req.headers['x-hub-signature'].split('=');
  const algorithm = hub_signature_arr[0],
        signature = hub_signature_arr[1];
  const hmac = crypto.createHmac(algorithm, SECRET_TOKEN);

  hmac.update(JSON.stringify(req.body));
  if(hmac.digest('hex') == signature){
    console.log('Signatures matched!');

    const child = execFile('../bash/deploy.sh', {
      cwd: __dirname
    }, (error, stdout, stderr)=>{
      if (error) {
        console.log(error);
      }
      console.log(stderr);
      console.log(stdout);
    });
  }

  res.end('thanks!');
});

module.exports = router;