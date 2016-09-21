'use strict'
var jwt = require('jsonwebtoken');
var fs = require('fs');
var request = require('request');
var prop = require(__proot + '/properties');
var log = require(__proot + '/service/shared/log/logService');
var ReqResExtracter = require(__proot + '/service/shared/log/reqResExtracter');
var error = require(__proot + '/service/error/error')

module.exports = new GoogleAuthService();

function GoogleAuthService() {

}

GoogleAuthService.prototype.getAuthUrl = getAuthUrl;
GoogleAuthService.prototype.getAuthCode = getAuthCode;
GoogleAuthService.prototype.getAccessToken = getAccessToken;
GoogleAuthService.prototype.getAccessTokenPayload = getAccessTokenPayload;

function getAuthUrl() {
    log.debug("entered GoogleAuthService.getAuthUrl with no arg")

    let googleOauthStep1Url = prop.idProvider.google.oauth2Step1UrlEP + "scope=" +
        encodeURIComponent(prop.idProvider.google.scope) + "&response_type=" +
        encodeURIComponent(prop.idProvider.google.response_type) + "&client_id=" +
        encodeURIComponent(prop.idProvider.google.client_id) + "&access_type=" +
        encodeURIComponent(prop.idProvider.google.access_type) + "&redirect_uri=" +
        encodeURIComponent(prop.oauth2.callbackurl)

    return googleOauthStep1Url;
}

function getAuthCode(req) {
    log.debug("entered GoogleAuthService.getAuthCode with req object");
    return new Promise(function(fulfill, reject) {

        if (req.query) {
            if (req.query.code) {
                fulfill(req.query.code)
            } else if (req.query.error) {
                reject(new error.SocialProviderError('Google error response for accesscode: ' + req.query.error));
            } else {
                reject(new error.SocialProviderError('No accesscode returned from google'));
            }
        } else {
            reject(new error.SocialProviderError('No query returned from google in http headers'))
        }

    })
}

function getAccessToken(auth_code) {
    log.debug("entered GoogleAuthService.getAccessToken with auth_code: " + auth_code);
    return new Promise(function(fulfill, reject) {

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
            log.debug("entered GoogleAuthService.getAccessToken.handleAccessToken with body: " + body );
            if (err) {
                reject(new error.ServerError(err.message))
            } else if (body.error) {
                reject(new error.SocialProviderError("GoogleErrRespForAccessToken-" + body.error.name + "-" + body.error.error_description) );
            } else {
                fulfill(body)
            }
        }

    })
}

function getAccessTokenPayload(accessToken) {
    log.debug("entered GoogleAuthService.getAccessTokenPayload with accessToken: " + accessToken);
    return new Promise(function(fulfill, reject) {

        let accessTokenP = JSON.parse( accessToken ); 
        var payload = jwt.decode(accessTokenP.id_token);
        fulfill(payload);
        

        let fileLoc = __proot + '/keys/google.pem';
        fs.readFile(fileLoc, (err, cert) => {
            if (err)
                reject(error.ServerError('Error reading google pem key file at ' + fileLoc));
            else {               
                jwt.verify(accessTokenP.id_token, cert, {
                        ignoreExpiration: true,
                        issuer: prop.idProvider.google.iss
                    },
                    function(err, payload) {
                        if (err) {
                            reject(new error.SocialProviderError("InvalidGooleAccessToken-" + err.name + "-" + err.message ) )
                        } else {
                            fulfill(payload);
                        }
                    })
            }
        });


    })
}
