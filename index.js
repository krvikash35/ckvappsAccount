//initialization: require all the variable
global.__proot = __dirname;

var app = require('express')();
var httpd = require('http').createServer(app);
var mongoose = require('mongoose');


//configuaration: db, app, router etc
require('./config/appConfig')(httpd);
require('./config/dbConfig')(mongoose);
require('./config/routeConfig')(app);
