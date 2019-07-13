/*
 * @Author: Nokey 
 * @Date: 2017-12-31 19:43:53 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 22:27:45
 */
'use strict'; 

// Core
const http    = require('http')
const https   = require('https')
const express = require('express')
const app     = express()
const path    = require('path')
const fs      = require('fs')
const log4js  = require('log4js')

// Middlewares
const favicon       = require('serve-favicon')
// const morgan     = require('morgan') // HTTP Request logger
const log           = require('./common/logger').getLogger('infoLog')
const session       = require('express-session')
const RedisStore    = require('connect-redis')(session)
const redis_client  = require('./common/redisClient')
const bodyParser    = require('body-parser')
const compression   = require('compression')
const cors          = require('cors')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Environments
app.set('port', process.env.NODE_PORT || 80)
app.set('env', process.env.NODE_ENV || 'production')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Use Middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(morgan(':remote-addr :referrer :date[iso] :method :url :status :response-time ms - :res[content-length]'))
app.use(log4js.connectLogger(logger, {
    level: 'info',
    format: (req, res, format) => format(`:status :remote-addr :referrer :method :url :response-time ms ${JSON.stringify(req.body)}`)
}))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'Garfield cat',
    name: 'G.SID',
    resave: false,
    saveUninitialized: true,
    rolling: true,  // refresh session on every response
    cookie: {
        path: '/',
        // httpOnly: true,
        maxAge: 3600000,
        secure: false
    },
    store: new RedisStore({
        client: redis_client
    })
}))

/*****  Passport Config  *****/
app.use(passport.initialize())
app.use(passport.session())

const Users = require('./models/User')
passport.use(new LocalStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())
/*****  END: Config  *****/

// CORS config
let corsOptions = null
if ('development' !== app.get('env')) {
    corsOptions = {
        origin: [/\.domain1\.com$/, /\.domain2\.me$/]
    }
} else {
    corsOptions = {
        origin: [/127\.0\.0\.1:8080/, /localhost:8080/]
    }
}

/**
 * Routes
 */
let page = require('./routes/page'),
    api = require('./routes/api')

app.post('/api/*', cors(corsOptions), api)
app.get('/*', page)

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

/**
 * Error Handle
 */
app.use((err, req, res, next) => {
    log.error('HTTP', err.message)

    res.status(err.status || 500)
    res.render('error', {
        message: err.message,

        // Development error handler Will print stacktrace
        // Production error handler No stacktraces leaked to user
        error: app.get('env') === 'development' ? err : {}
    })
})

// HTTP Server
const server_http = http.createServer(app)
server_http.listen(app.get('port'), () => {
    log.info('App Env: ' + app.get('env'))
    log.info(corsOptions)
    log.info('Express HTTP server listening on port ' + app.get('port'))
})

// HTTPS Server
// const options = {
//     key: fs.readFileSync('./server.key'),
//     cert: fs.readFileSync('./server.crt')
// };
// const server_https = https.createServer(options, app);
// server_https.listen(443, () => {
//     log.info('Express HTTPS server listening on port 443');
// });

module.exports = app
