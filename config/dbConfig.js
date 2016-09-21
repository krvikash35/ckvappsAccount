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
    log.debug(new error.DebugLog({
        "enteredFunction": "DBConfig.createConnection",
        "withArg": [null]
    }).stack)

    this.connection = mongoose.createConnection(prop.db.uri, function(err) {
        if (err) {
            log.error(new error.DBError(err).stack)
        } else {
            log.info(new error.InfoLog({
                "openedDBConnectionTo": prop.db.uri
            }).stack);
        }
    })
    this.connection.on("close", function() {
        prop.db.state = 'DIRTY';
        log.error(new error.DBError("DBConnection closed").stack);
    })

}

function getConnection() {
    log.debug(new error.DebugLog({
        "enteredFunction": "DBConfig.getConnection",
        "withArg": [null]
    }).stack)
    return this.connection;
};
