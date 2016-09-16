var log = require(__proot+"/server/service/logService");
var bodyParser  = require('body-parser');
var exp = require('express');

module.exports = routeConfig;

function routeConfig(app){
  //route middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/user/:userId', privResAccessValidator);
  app.use('/node_modules', exp.static( __proot + '/node_modules' ) );
  app.use('/client', exp.static( __proot + '/client' ) );

  app.get('/', function(req, res){
    res.sendFile( __proot + "/client/index.html" );
  })

}

function privResAccessValidator(req, resp, next){
  log.debug("calling privResAccessValidator with " + req.headers + req.body)
  next();
}
