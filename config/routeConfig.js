var log = require(__proot + "/service/shared/log/logService")
var bodyParser = require('body-parser');
var exp = require('express');
var morgan = require('morgan')
var authService = require(__proot + "/service/auth/authService")


module.exports = routeConfig;

function routeConfig(app) {
    //route middleware
    app.use('/node_modules', exp.static(__proot + '/node_modules'));
    app.use(exp.static(__proot + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use('/user/:userId', privResAccessValidator);
    app.use('/login', authService.login)
    app.use('/oauth2callback', authService.handleOauthCallback)


}

function privResAccessValidator(req, resp, next) {
    log.debug("calling privResAccessValidator with " + req.headers + req.body)
    next();
}
