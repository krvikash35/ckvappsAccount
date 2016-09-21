'use strict'
var mongoose = require('mongoose');
var log = require(__proot + "/service/log/logService")
var prop = require(__proot + '/properties');
var error = require(__proot + "/service/error/error")

module.exports = new DBConfig();

function DBConfig() {
    this.connection = null;
}

DBConfig.prototype.createConnection = createConnection;
DBConfig.prototype.getConnection = getConnection;

function createConnection() {
    log.debug("entered DBConfig.createConnection")

    this.connection = mongoose.createConnection(prop.db.uri, function(err) {
        if (err) {
            log.error(err.stack)
        } else {
            log.info("opened db connection to: " + prop.db.uri);
        }
    })
    this.connection.on("close", function() {
        //db connection close should always be logto file instead of console
        prop.db.state = 'DIRTY';
        log.setConfig({
            logMethod: 2
        });
        log.error(new error.DBError("DBConnection closed").stack);
        log.setConfig({
            logMethod: 1
        });
    })

}

function getConnection() {
    log.debug("entered DBConfig.getConnection")
    return this.connection;
}
