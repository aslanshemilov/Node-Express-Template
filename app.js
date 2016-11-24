/*
 * @Author: Nokey 
 * @Date: 2016-11-23 15:09:52 
 * @Last Modified by: Nokey
 * @Last Modified time: 2016-11-23 15:15:13
 */
'use strict';

var http         = require('http');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var morgan       = require('morgan');  // HTTP Request logger
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var app          = express();
var compression  = require('compression');

// Routes
var routes = require('./routes');

// view engine setup
app.set('port', process.env.NODE_PORT || 80);
app.set('env', process.env.NODE_ENV || 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', true);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
// :method :url :status :response-time ms - :res[content-length]
app.use(morgan(':date[iso] :method :url :status :response-time ms - :res[content-length]'));
app.use(compression());  // Gzip
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Env: ' + app.get('env'));
// CROS
// var allowOrigin = new RegExp('^http:\/\/(.+\.)*cctvnews\.cn$');
var cors = require('./common/cors');
app.use(cors({
  origin: '^http:\/\/(.+\.)*cctvnews\.cn$'
}));

// API
app.get('/', (req, res, next)=>{
  res.render('pages/index');
})
app.get('/api/*', routes.api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// END