'use strict'
var prop = require(__proot + '/properties');
var log = require(__proot + '/service/shared/log/logService');
var request = require('request')

module.exports = new GoogleAuthService();

function GoogleAuthService() {

}

GoogleAuthService.prototype.getAuthUrl = getAuthUrl;
GoogleAuthService.prototype.getAccessToken = getAccessToken;

function getAuthUrl() {
    log.debug("called GoogleAuthService.getAuthUrl with: no param ")
    let googleOauthStep1Url = prop.idProvider.google.oauth2Step1UrlEP + "scope=" +
        encodeURIComponent(prop.idProvider.google.scope) + "&response_type=" +
        encodeURIComponent(prop.idProvider.google.response_type) + "&client_id=" +
        encodeURIComponent(prop.idProvider.google.client_id) + "&access_type=" +
        encodeURIComponent(prop.idProvider.google.access_type) + "&redirect_uri=" +
        encodeURIComponent(prop.oauth2.callbackurl)


    log.debug("return GoogleAuthService.getAuthUrl with: \n" + googleOauthStep1Url)
    return googleOauthStep1Url;
}

function getAccessToken(auth_code, res) {
    request.post({
            url: prop.idProvider.google.oauth2Step2UrlEP,
            form: {
                "code": auth_code,
                "client_id": prop.idProvider.google.client_id,
                "client_secret": prop.idProvider.google.client_secret,
                "redirect_uri": prop.oauth2.callbackurl
            }
        },
        handleAccessToken
    )

    function handleAccessToken(err, httpRes, body) {
        console.log(err)
        console.log(httpRes)
        console.log(body)
        return res.send("handling access")
    }

}
