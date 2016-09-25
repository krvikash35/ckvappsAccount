'use strict'
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var exp = require('express');
var morgan = require('morgan')
var authService = require(__proot + "/features/auth/authService")
var logger = require('logat')

module.exports = routeConfig;

function routeConfig(app) {
    logger.debug();

    let apiPrivRouter = exp.Router()
    let apiPubRouter = exp.Router()
        //route middleware
    app.use('/node_modules', exp.static(__proot + '/node_modules'));
    app.use(exp.static(__proot + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(reqResLogger);
    app.use('/api', apiPrivRouter);

    app.get('*', function(req, res) {
        res.sendFile(__proot + "/public/index.html")
    })
    apiPrivRouter.get('/login', authService.login)
    apiPrivRouter.get('/oauth2callback', authService.handleOauthCallback)
    apiPrivRouter.get('/isloggedin', authService.isLoggedIn)
}

function reqResLogger(req, res, next) {
    logger.info('originalUrl: ', req['originalUrl'], 'Path: ', req['path'], 'RequestQuery: ', req['query'],
        'RequestHeaders: ', req.headers, 'ResquestBody: ', req.body);
    next();
}
