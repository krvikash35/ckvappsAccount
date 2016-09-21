'use strict'
var prop = require(__proot + "/properties")
var log = require(__proot + "/service/log/logService")
var error = require(__proot + "/service/error/error")

module.exports = appConfig;

function appConfig(httpd) {
    log.debug(new error.DebugLog({
        "enteredFunction": "appConfig",
        "withArg": [httpd]
    }).stack);

    httpd.on('error', (err) => {
        prop.app.state = 'DIRTY'
        log.error(new error.ServerError(err).stack)
    })

    httpd.listen(prop.app.port, function(err) {
        if (err) {
            log.error(new error.ServerError(err));
        } else {
            log.info(new error.InfoLog({
                "openedHostListenerOn": prop.app.port
            }).stack);
        }
    });

}
