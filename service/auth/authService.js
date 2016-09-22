'use strict'
var request = require('request');
var jwt = require('jsonwebtoken');
var prop = require(__proot + '/properties')
var log = require(__proot + '/service/log/logService')
var ReqResExtracter = require(__proot + '/service/log/reqResExtracter')
var googleAuthService = require(__proot + '/service/auth/googleAuthService');
var error = require(__proot + '/service/error/error');
var user = require(__proot + '/model/user');

module.exports = new AuthService();

function AuthService() {

}

AuthService.prototype.login = login;
AuthService.prototype.handleOauthCallback = handleOauthCallback;
AuthService.prototype.isLoggedIn = isLoggedIn;

function login(req, res) {
    log.debug(new error.DebugLog({
        "enteredFunction": "AuthService.login",
        "request": ReqResExtracter.getRequest(req)
    }).stack);

    let returnData = {
        "data": null
    };
    if (req.query && req.query.via) {
        switch (req.query.via) {
            case prop.idProvider.google.name:
                returnData.data = googleAuthService.getAuthUrl();
                res.status(200);
                break;

            default:
                let err = new error.InvalidRequestError('login method provided is not supported');
                log.warn(err.stack);
                returnData.data = err.resForUser;
                res.status(400);
        }
    } else {
        let err = new error.InvalidRequestError('login method not provided');
        log.warn(err.stack);
        returnData.data = err.resForUser;
        res.status(400);
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
                    return res.status(200).send(signedToken);
                })
                .catch(function(err) {
                    log.error(err.stack)
                    return res.status(400).send(err.resForUser)
                })
            break;
    }

}

function isLoggedIn(req, res) {
    var bearerHeader = req.headers["authorization"]; //Authorization :'Bearer token'
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
                resolve(decoded)
        })

    })
}
