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
    let usrRes = {
        data: {}
    }
    if (req.query && req.query.via) {
        switch (req.query.via) {
            case prop.idProvider.google.name:
                usrRes.data = googleAuthService.getAuthUrl()
                logger.info('UserSuccessResponse', usrRes)
                return res.status(200).send(usrRes);
                break;
            default:
                usrRes.data.error = 'InvalidRequestError';
                usrRes.data.error_description = 'login method provided is not supported';
                logger.warn('UserErrorResponse: ', usrRes)
                return res.status(400).send(usrRes);
        }
    } else {
        usrRes.data.error = 'InvalidRequestError';
        usrRes.data.error_description = 'login method not provided';
        logger.warn('UserErrorResponse: ', usrRes)
        return res.status(400).send(usrRes);
    }

    return res.send(returnData)
}

function handleOauthCallback(req, res) {
    logger.debug();
    let usrRes = {
        data: {}
    }
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
                    usrRes.data.error = err.name;
                    usrRes.data.error_description = err.message;
                    logger.error(err)
                    return res.status(400).send(usrRes)
                })
            break;
    }

}

function isLoggedIn(req, res) {
    logger.debug();
    let usrRes = {
        data: {}
    }
    var bearerHeader = req.headers["authorization"]; //Authorization :'Bearer token'
    logger.info('BearerHeader: ', bearerHeader);
    if (bearerHeader) {
        let userToken = bearerHeader.split(" ")[1]
        if (userToken) {
            validateUserToken(userToken)
                .then(function(payload) {
                    usrRes.data = true;
                    logger.info('UserSuccessResponse for isLoggedIn true send')
                    return res.status(200).send(usrRes)
                })
                .catch(function(err) {
                    usrRes.data.error = err.name;
                    usrRes.data.message = err.message;
                    logger.warn('UserErrorResponse', err)
                    return res.status(400).send(usrRes);
                })
        } else {
            usrRes.error = 'InvalidRequestError';
            usrRes.error_description = 'Token not present in Authorization header'
            logger.warn('UserErrorResponse: ', usrRes);
            return res.status(400).send(usrRes);
        }
    } else {
        usrRes.data.error = 'InvalidRequestError';
        usrRes.data.message = 'Bearer not present in Authorization header';
        logger.warn('UserErrorResponse: ', usrRes);
        return res.status(400).send(usrRes);
    }
}

function getSignedToken(payload) {
    logger.debug();
    logger.info('getSignedTokenForPayload: ', payload)
    return new Promise(function(fulfill, reject) {

        let options = {
            expiresIn: "2 days",
            issuer: prop.oauth2.iss,
            subject: payload.id.toString()
        }
        jwt.sign(payload, prop.oauth2.secret, options, function(err, signedToken) {
            if (err)
                reject(err);
            else
                fulfill(signedToken)
        })

    })
}

function validateUserToken(userToken) {
    logger.debug();
    logger.info('validateUserTokenFor: ', userToken)
    return new Promise(function(fulfill, reject) {

        jwt.verify(userToken, prop.oauth2.secret, function(err, decoded) {
            if (err)
                reject(new error.InvalidRequestError(err.message));
            else
                fulfill(decoded)
        })

    })
}
