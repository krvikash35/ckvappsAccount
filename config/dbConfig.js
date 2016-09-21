var mongoose = require('mongoose');
var log = require(__proot + "/service/shared/log/logService")
var prop = require(__proot+'/properties');
var error = require(__proot + "/service/error/error")

module.exports = new DBConfig();

function DBConfig(){
  this.connection = null;
}

DBConfig.prototype.createConnection = createConnection;
DBConfig.prototype.getConnection = getConnection;

function createConnection(){
  log.debug("entered DBConfig.createConnection")
  
  mongoCon = mongoose.createConnection( prop.db.uri, function(err){
    if(err){
      log.err( err.stack )
    }else{
      log.info( "opened db connection to: "+ prop.db.uri )
    }
  })
  this.connection = mongoCon;
  mongoCon.on("close", function(){
     //db connection close should always be logto file instead of console
    prop.db.state = 'DIRTY';
    log.setConfig({logMethod: 2});
    log.error( new error.DBError("DBConnection closed") );
    log.setConfig({logMethod: 1});
  })

}

function getConnection(){
  return this.connection;
}
