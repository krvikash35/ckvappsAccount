'use strict'

var request = require('request')
var prop = require(__proot + '/properties')
var log = require(__proot + '/service/shared/log/logService')
var ReqResExtracter = require(__proot + '/service/shared/log/ReqResExtracter')
var googleAuthService = require(__proot + '/service/auth/googleAuthService');


module.exports = new AuthService();

function AuthService() {


}

AuthService.prototype.login = login;
AuthService.prototype.handleOauthCallback = handleOauthCallback;

function login(req, res){
    log.debug("called AuthService.login with : \n" + ReqResExtracter.getRequest( req ) );  
   
    if(req.query){
        if(req.query.via === 'google'){
            return res.send( {"data": googleAuthService.getAuthUrl() } );
        }
    }
}

function handleOauthCallback(req, res){   
    log.debug("called AuthService.handleOauthCallback with : \n" + ReqResExtracter.getRequest( req ) );  
    let referer = "google";
    if( referer === "google" ){
        if( req.query ){
            if( req.query.error ){

            }else{
                googleAuthService.getAccessToken( req.query.code , res);
            }
            
        }
        
    }

    // return res.send( "to be handled callback")
}


