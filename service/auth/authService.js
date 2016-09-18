'use strict'

var prop = require(__proot + '/properties')
var log = require(__proot + '/service/shared/log/logService')

module.exports = new AuthService();

function AuthService() {


}
AuthService.prototype.handleOauthCallback = function(req, res) {
    console.log(req.headers);
    res.send("hellog")
    if (req.param.error) {
        console.log("error while logging");
    } else {
        let code = req.param.code;

    }
}

AuthService.prototype.login = function(req, res) {
    log.debug('called authService.login')

    let googleSignInfo = {
        oauth2Url: "https://accounts.google.com/o/oauth2/v2/auth?",
        scope: "email%20profile",
        redirect_uri: prop.oauth2.callbackurlEncoded,
        response_type: 'code',
        client_id: prop.idProvider.google.client_id,
        access_type: 'offline'

    }

    let googleUrlStep1 = googleSignInfo.oauth2Url + "scope=" +
        googleSignInfo.scope + "&redirect_uri=" +
        googleSignInfo.redirect_uri + "&response_type=" +
        googleSignInfo.response_type + "&client_id=" +
        googleSignInfo.client_id + "&access_type=" +
        googleSignInfo.access_type

    log.info('googleUrlStep1: ' + googleUrlStep1)
    res.send({
        data: googleUrlStep1
    });

};
