'use strict'
var jwt = require('jsonwebtoken');
var fs = require('fs');
var request = require('request');
var prop = require(__proot + '/properties');
var logger = require('logat');

module.exports = new GoogleAuthService();

function GoogleAuthService() {

}

GoogleAuthService.prototype.getAuthUrl = getAuthUrl;
GoogleAuthService.prototype.getAuthCode = getAuthCode;
GoogleAuthService.prototype.getAccessToken = getAccessToken;
GoogleAuthService.prototype.getAccessTokenPayload = getAccessTokenPayload;

function getAuthUrl() {
    logger.debug()
    let googleOauthStep1Url = prop.idProvider.google.oauth2Step1UrlEP + "scope=" +
        encodeURIComponent(prop.idProvider.google.scope) + "&response_type=" +
        encodeURIComponent(prop.idProvider.google.response_type) + "&client_id=" +
        encodeURIComponent(prop.idProvider.google.client_id) + "&access_type=" +
        encodeURIComponent(prop.idProvider.google.access_type) + "&redirect_uri=" +
        encodeURIComponent(prop.oauth2.callbackurl)

    return googleOauthStep1Url;
}

function getAuthCode(req) {
    logger.debug();
    return new Promise(function(fulfill, reject) {

        if (req.query) {
            if (req.query.code) {
                fulfill(req.query.code)
            } else if (req.query.error) {
                reject(new Error('Google error response for accesscode: ' + req.query.error));
            } else {
                reject(new Error('No accesscode returned from google'));
            }
        } else {
            reject(new Error('No query returned from google in http headers'))
        }

    })
}

function getAccessToken(auth_code) {
    logger.debug();
    logger.info('getAccessTokenForAuthCode: ', auth_code)
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
            logger.debug("entered GoogleAuthService.getAccessToken.handleAccessToken with body: " + body);
            if (err) {
                reject(err)
            } else if (body.error) {
                reject(new Error("GoogleErrRespForAccessToken-" + body.error.name + "-" + body.error.error_description));
            } else {
                fulfill(body)
            }
        }

    })
}

function getAccessTokenPayload(accessToken) {
    logger.debug();
    logger.info('getAccessTokenPayloadFor: ', accessToken)
    return new Promise(function(fulfill, reject) {

        let accessTokenP = JSON.parse(accessToken);
        var payload = jwt.decode(accessTokenP.id_token);
        fulfill(payload);


        let fileLoc = __proot + '/keys/google.pem';
        fs.readFile(fileLoc, (err, cert) => {
            if (err)
                reject(err);
            else {
                jwt.verify(accessTokenP.id_token, cert, {
                        ignoreExpiration: true,
                        issuer: prop.idProvider.google.iss
                    },
                    function(err, payload) {
                        if (err) {
                            reject(err)
                        } else {
                            fulfill(payload);
                        }
                    })
            }
        });


    })
}
