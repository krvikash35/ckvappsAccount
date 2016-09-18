var log = require(__proot + "/service/shared/log/logService")
var prop = require(__proot+'/properties');

module.exports = dbConfig;

function dbConfig(mongoose){
  log.debug( "calling dbConfig with mongoose object"  );

  var mongoCon = mongoose.createConnection(prop.db.uri, function(err){
    if(err){
      log.error(err.stack);
    }else {
      log.info("connected to db" + prop.db.uri);
    }
  })

  mongoCon.on("close", function(){
    //db connection close should always be logto file instead of console
    prop.db.state = 'DIRTY';
    log.setConfig({logMethod: 2});
    log.error(new Error("DB connection closed").stack);
    log.setConfig({logMethod: 1});
  })

}
