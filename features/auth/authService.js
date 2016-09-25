'use strict'
var request = require('request');
var jwt = require('jsonwebtoken');
var prop = require(__proot + '/properties')
var googleAuthService = require(__proot + '/features/auth/googleAuthService');
var user = require(__proot + '/model/user');
var logger = require('logat');

module.exports = new AuthService();

function AuthService() {

}

AuthService.prototype.login = login;
AuthService.prototype.handleOauthCallback = handleOauthCallback;
AuthService.prototype.isLoggedIn = isLoggedIn;

function login(req, res) {
    logger.debug();
    if (req.query && req.query.via) {
        switch (req.query.via) {
            case prop.idProvider.google.name:
                let usrRes = {
                    data: googleAuthService.getAuthUrl()
                }
                log.info('UserSuccessResponse', usrRes)
                return res.status(200).send(usrRes);
                break;
            default:
                let usrRes = {
                    data: {
                        error: 'InvalidRequestError',
                        error_description: 'login method provided is not supported'
                    }
                }
                logger.warn('UserErrorResponse: ', usrRes)
                return res.status(400).send(usrRes);
        }
    } else {
        let usrRes = {
            data: {
                error: 'InvalidRequestError',
                error_description: 'login method not provided'
            }
        }
        logger.warn('UserErrorResponse: ', usrRes)
        return res.status(400).send(usrRes);
    }

    return res.send(returnData)
}

function handleOauthCallback(req, res) {
    log.debug(new error.DebugLog({
        "enteredFunction": "AuthService.handleOauthCallback",
        "request": ReqResExtracter.getRequest(req)
    }).stack);

    let idProvider = prop.idProvider.google.name;
    switch (idProvider) {
        case prop.idProvider.google.name:
            googleAuthService.getAuthCode(req)
                .then(function(gAuthCode) {
                    return googleAuthService.getAccessToken(gAuthCode);
                })
                .then(function(gAccessToken) {
                    return googleAuthService.getAccessTokenPayload(gAccessToken);
                })
                .then(function(gpayload) {
                    return user.getOrCreateGoogleSub(gpayload)
                })
                .then(function(userPayload) {
                    return getSignedToken(userPayload)
                })
                .then(function(signedToken) {
                    res.cookie('TID', signedToken, {
                        maxAge: 9999999999999999
                    });
                    let referer = req.headers['referer']
                    if (referer.split('?')[1]) {
                        referer = referer + "&token=" + signedToken;
                    } else {
                        referer = referer + "?token=" + signedToken;
                    }
                    return res.redirect(referer)
                })
                .catch(function(err) {
                    log.error(err.stack)
                    return res.status(400).send(err.resForUser)
                })
            break;
    }

}

function isLoggedIn(req, res) {
    log.debug('inside isLoggedIn');
    console.log(req.headers)
    var bearerHeader = req.headers["authorization"]; //Authorization :'Bearer token'
    console.log("bearerHeader", bearerHeader)
    if (bearerHeader) {
        let userToken = bearerHeader.split(" ")[1]
        if (userToken) {
            validateUserToken(userToken)
                .then(function(payload) {
                    return res.status(200).send({
                        data: true
                    })
                })
                .catch(function(err) {
                    log.warn(err.stack)
                    return res.status(400).send({
                        data: err.resForUser
                    });
                })
        } else {
            let err = new error.InvalidRequestError('Token not present in Authorization header');
            log.warn(err.stack);
            return res.status(400).send({
                data: err.resForUser
            });
        }
    } else {
        let err = new error.InvalidRequestError('Bearer not present in Authorization header');
        log.warn(err.stack);
        return res.status(400).send({
            data: err.resForUser
        });
    }
}

function getSignedToken(payload) {
    log.debug(new error.DebugLog({
        "enteredFunction": "AuthService.getSignedToken",
        "payload": payload
    }).stack);
    return new Promise(function(fulfill, reject) {

        let options = {
            expiresIn: "2 days",
            issuer: prop.oauth2.iss,
            subject: payload.id.toString()
        }

        jwt.sign(payload, prop.oauth2.secret, options, function(err, signedToken) {
            if (err)
                reject(new error.InvalidRequestError(err));
            else
                fulfill(signedToken)
        })

    })
}

function validateUserToken(userToken) {
    log.debug(new error.DebugLog({
        "enteredFunction": "AuthService.validateUserToken",
        "userToken": userToken
    }).stack);
    return new Promise(function(fulfill, reject) {

        jwt.verify(userToken, prop.oauth2.secret, function(err, decoded) {
            if (err)
                reject(new error.InvalidRequestError(err.message));
            else
                fulfill(decoded)
        })

    })
}
