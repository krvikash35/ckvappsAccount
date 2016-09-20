'use strict'
var request = require('request')
var prop = require(__proot + '/properties')
var log = require(__proot + '/service/shared/log/logService')
var ReqResExtracter = require(__proot + '/service/shared/log/reqResExtracter')
var googleAuthService = require(__proot + '/service/auth/googleAuthService');
var error = require(__proot + '/service/error/error');

module.exports = new AuthService();

function AuthService() {


}

AuthService.prototype.login = login;
AuthService.prototype.handleOauthCallback = handleOauthCallback;

function login(req, res) {
    log.debug("entered Authservice.login with : \n" + ReqResExtracter.getRequest(req));
    let returnData = {
        "data": null
    };

    if (req.query && req.query.via) {
        switch (req.query.via) {
            case "google":
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

    log.debug("returned Authservice.login with : \n" + returnData);
    return res.send(returnData)
}

function handleOauthCallback(req, res) {
    log.debug("called AuthService.handleOauthCallback with : \n" + ReqResExtracter.getRequest(req));
    let returnData = {
        "data": null
    }

    let referer = "google";
    if (referer === "google") {
        if (req.query) {
            if (req.query.error) {

            } else {
                googleAuthService.getAccessToken(req.query.code, res);
            }

        }

    }

    return res.send(returnData)
}
