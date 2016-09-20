'use strict'
var prop = require(__proot + '/properties');
var log = require(__proot + '/service/shared/log/logService');
var request = require('request');
var ReqResExtracter = require(__proot + '/service/shared/log/reqResExtracter');


module.exports = new GoogleAuthService();

function GoogleAuthService() {

}


GoogleAuthService.prototype.getAuthUrl = getAuthUrl;
GoogleAuthService.prototype.getAccessToken = getAccessToken;

function getAuthUrl() {
    log.debug("entered GoogleAuthService.getAuthUrl with no arg: \n" )

    let googleOauthStep1Url = prop.idProvider.google.oauth2Step1UrlEP + "scope=" +
        encodeURIComponent(prop.idProvider.google.scope) + "&response_type=" +
        encodeURIComponent(prop.idProvider.google.response_type) + "&client_id=" +
        encodeURIComponent(prop.idProvider.google.client_id) + "&access_type=" +
        encodeURIComponent(prop.idProvider.google.access_type) + "&redirect_uri=" +
        encodeURIComponent(prop.oauth2.callbackurl)

    log.debug("returned GoogleAuthService.getAuthUrl with : \n" + googleOauthStep1Url)
    return googleOauthStep1Url;
}

function getAccessToken(auth_code) {
    request.post({
            url: prop.idProvider.google.oauth2Step2UrlEP,
            form: {
                "code": auth_code,
                "client_id": prop.idProvider.google.client_id,
                "client_secret": prop.idProvider.google.client_secret,
                "redirect_uri": prop.oauth2.callbackurl,
                "grant_type": 'authorization_code'
            }
        },
        handleAccessToken
    )

    function handleAccessToken(err, httpRes, body) {
        // log.debug("called AuthService.handleOauthCallback with : \n" + ReqResExtracter.getRequest(req));
        console.log(err)    
        console.log(body)
        if(body.error){
            //error occured
            log.error()
            return res.send("error occured")
        }else{

        }
        return res.send("handling access")
    }

}
