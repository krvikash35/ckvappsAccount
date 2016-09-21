'use strict'
var prop = require(__proot + "/properties")
var log = require(__proot + "/service/log/logService")
var error = require(__proot + "/service/error/error")

module.exports = appConfig;

function appConfig(httpd) {
    log.debug("called appConfig with " + JSON.stringify(arguments, null, 4));

    httpd.on('error', () => {
        //app connection close should always be logto file instead of console
        //if due to crash, start a new maintanence  server and display proper message to user
        prop.app.state = 'DIRTY'
        log.setConfig({
            logMethod: 2
        })
        log.error(new Error('Host Address could not open').stack)
        log.setConfig({
            logMethod: 2
        })
    })

    httpd.listen(prop.app.port, function(err) {
        if (err) {
            log.error(err.stack);
        } else {
            log.info("app listening on " + prop.app.port);
        }
    });

}
