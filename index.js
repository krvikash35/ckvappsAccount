//initialization: require all the variable
global.__proot = __dirname;

var express = require('express')();
var httpd = require('http').createServer(express);
var io = require('socket.io')(httpd)
var mongoose  = require('mongoose');


//configuaration: db, app, router etc
require('./server/config/appConfig')(httpd);
require('./server/config/dbConfig')(mongoose);
require('./server/config/routeConfig')(express);

require('./server/service/chatService')(io);
