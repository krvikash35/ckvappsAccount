//initialization: require all the variable
global.__proot = __dirname;

var app = require('express')();
var httpd = require('http').createServer(app);
var mongoose = require('mongoose');
var logger = require('logat');

logger.on('LogConfigError', function(err) {
    console.log(err);
})

logger.setOptions({
    logLevel: 4
})

//configuaration: db, app, router etc
require('./config/appConfig')(httpd);
require('./config/dbConfig').createConnection();
require('./config/routeConfig')(app);
