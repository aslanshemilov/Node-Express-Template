/*
 * @Author: Nokey 
 * @Date: 2017-02-03 14:37:37 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-04-07 16:47:54
 */
'use strict'; 

// var pmx = require('pmx').init({
//     http: true
// });

// Core
var http    = require('http');
var express = require('express');
var app     = express();
var path    = require('path');
var config  = require('./config');
var log     = require('./common/logger');

// Routes
var routes  = require('./routes');
// var startup = require('./routes/startup');
var webhook = require('./routes/webhook');

// Middlewares
var favicon        = require('serve-favicon');
var morgan         = require('morgan');
var methodOverride = require('method-override');
var cookie         = require('cookie-parser');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);
// var test_conn      = require('./models/mongoClient');
var bodyParser     = require('body-parser');
// var multer         = require('multer');   // multipart/form-data 上传文件使用
var errorHandler   = require('errorhandler');
var cors           = require('cors');

// gzip
var compression = require('compression');

// Environments
app.set('port', process.env.NODE_PORT || 80);
app.set('env', process.env.NODE_ENV || 'production');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use Middlewares
app.use(morgan(':remote-addr :referrer :date[iso] :method :url :status :response-time ms - :res[content-length]'));
app.use(compression());  // Gzip
app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(methodOverride());
app.use(cookie());   // req.cookies
// app.use(session({ resave: false,
//                   saveUninitialized: true,
//                   secret: '123456',
//                   cookie: {
//                     maxAge: 6000
//                   },
//                   store: new MongoStore({
//                     mongooseConnection: test_conn
//                   })
//                 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());   // req.body & req.file or req.files
app.use(express.static(path.join(__dirname, 'public')));

log.trace('Process Env:' + process.env.NODE_ENV);
log.trace(app.get('env'));

// CORS
if('development' !== app.get('env')){
  var corsOptions = {
    origin: [/\.example\.com$/, 'http://127.0.0.1:3000', 'http://localhost:8080']
  };
}else{
  var corsOptions = {
    origin: '*'
  };
}
log.trace(corsOptions);

/**
 * Home Route
 */
 
app.get('/', routes);

/**
 * test React Redirect
 */
app.get('/test', function(req, res, next){
  res.render('pages/startup/index');
});
app.get('/test/*', function(req, res, next){
  res.render('pages/startup/index');
});

/**
 * Startup API Route
 */
// app.get('/startup/*', cors(corsOptions), startup);
// app.post('/startup/*', cors(corsOptions), startup);

/**
 * Webhook Route
 */
app.get('/webhook/*', webhook);
app.post('/webhook/*', webhook);


// Error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);

module.exports = server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// END