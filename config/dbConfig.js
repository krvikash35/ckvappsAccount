'use strict'
var mongoose = require('mongoose');
var prop = require(__proot + '/properties');
var logger = require('logat');

module.exports = new DBConfig();

function DBConfig() {
    this.connection = null;
}

DBConfig.prototype.createConnection = createConnection;
DBConfig.prototype.getConnection = getConnection;

function createConnection() {
    logger.debug();
    this.connection = mongoose.createConnection(prop.db.uri, function(err) {
        if (err) {
            logger.error(err)
        } else {
            logger.info('DBConnection opened to: ', prop.db.uri)
        }
    })
    this.connection.on("close", function() {
        logger.error('DBConnection closed')
    })
}

function getConnection() {
    logger.debug();
    return this.connection;
};;
