'use strict'
var prop = require(__proot + "/properties")
var logger = require('logat')

module.exports = appConfig;

function appConfig(httpd) {
    logger.debug();
    httpd.on('error', (err) => {
        logger.error(err);
    });
    httpd.listen(prop.app.port, function(err) {
        if (err) {
            logger.error(err);
        } else {
            logger.info('App server bind to port: ', prop.app.port)
        }
    });

}
