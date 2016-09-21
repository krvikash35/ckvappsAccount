'use strict'
var bodyParser = require('body-parser');
var exp = require('express');
var morgan = require('morgan')
var authService = require(__proot + "/service/auth/authService")
var log = require(__proot + "/service/log/logService")
var error = require(__proot + "/service/error/error")


module.exports = routeConfig;

function routeConfig(app) {
    log.debug(new error.DebugLog({
        "enteredFunction": "routeConfig"
    }));
    let apiRouter = exp.Router()

    //route middleware
    app.use('/node_modules', exp.static(__proot + '/node_modules'));
    app.use(exp.static(__proot + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use('/api', apiRouter);

    app.get('*', function(req, res) {
        res.sendFile(__proot + "/public/index.html")
    })

    apiRouter.get('/login', authService.login)
    apiRouter.get('/oauth2callback', authService.handleOauthCallback)
}
