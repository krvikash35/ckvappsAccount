'use strict'
var dbcon = require(__proot + '/config/dbConfig').getConnection();
var mongoose = require('mongoose')
var error = require(__proot + '/service/error/error');
var log = require(__proot + '/service/log/logService');
var prop = require(__proot + '/properties');
// var dbcon = mongoose.createConnection(prop.db.uri);

var userSchema = new mongoose.Schema({
    basicInfo: {
        name: String,
        picture: String,
        email: String,
        emailVerified: Boolean
    },
    idProvider: {
        google: mongoose.Schema.Types.Mixed
    }
})

var User = dbcon.model('Users', userSchema);
var userService = {
    createUser: createUser,
    getUserByGoogleSub: getUserByGoogleSub,
    getOrCreateGoogleSub: getOrCreateGoogleSub
}

module.exports = userService;

//model.collection.insert is faster than model.create, as it bypass mongoose validation to go directly to mongodb driver
function createUser(userInfo, idProvider) {
    log.debug("entered userService.createUser with idProvider: " + idProvider + " userInfo: " + JSON.stringify(userInfo, null, 4))
    return new Promise(function(fulfill, reject) {

        var userd = {
            basicInfo: {},
            idProvider: {}
        };
        if (idProvider === 'google') {
            userd.basicInfo.name = userInfo.name;
            userd.basicInfo.email = userInfo.email;
            userd.basicInfo.picture = userInfo.picture;
            userd.basicInfo.emailVerified = userInfo.email_verified;
            userd.idProvider.google = userInfo;
        }
        User.create(userd, function(err, user) {
            if (err) {
                reject(new error.DBError("Error creating user-" + err.name + "-" + err.message))
            } else {
                user.basicInfo._id = user._id;
                fulfill(user.basicInfo);
            }
        })

    })
}

function getUserByGoogleSub(sub) {
    log.debug(new error.DebugLog({
        "enteredFunction": "userService.getUserByGoogleSub",
        "sub": sub
    }).stack)
    return new Promise(function(fulfill, reject) {

        User.find({
            'idProvider.google.sub': sub
        }, function(err, user) {
            if (err) {
                reject(new error.DBError(err.message))
            } else {
                if (user.length == 0) {
                    fulfill(null)
                } else {
                    let basicInfo = {}
                    basicInfo.id = user[0].id;
                    basicInfo.name = user[0].basicInfo.name
                    basicInfo.picture = user[0].basicInfo.picture;
                    basicInfo.emailVerified = user[0].basicInfo.emailVerified;
                    fulfill(basicInfo)
                }
            }

        })

    })
}


function getOrCreateGoogleSub(sub) {
    log.debug(new error.DebugLog({
        "enteredFunction": userService.getOrCreateGoogleSub,
        "sub": sub
    }).stack)

    return new Promise(function(fulfill, reject) {

        User.findOne({
            'idProvider.google.sub': sub
        }, function(err, existUser) {
            if (err)
                reject(err)
            else {
                if (existUser) {
                    fulfill(getBasicInfoForPyalod(existingUser))
                } else {
                    User.create(setUserInfoFromSub(sub), function(err, createdUser) {
                        if (err)
                            reject(err)
                        else {
                            fulfill(getBasicInfoForPyalod(createdUser))
                        }
                    })
                }
            }
        })

        function getBasicInfoForPyalod(user) {
            let basicInfo = {}
            basicInfo.id = user._id;
            basicInfo.name = user.basicInfo.name;
            basicInfo.email = user.basicInfo.email;
            basicInfo.picture = user.basicInfo.picture;
            basicInfo.emailVerified = user.basicInfo.emailVerified;
            return basicInfo;
        }

        function setUserInfoFromSub(sub) {
            let userInfo = {}
            userInfo.basicInfo = {}
            userInfo.basicInfo.name = sub.name;
            userInfo.basicInfo.email = sub.email;
            userInfo.basicInfo.picture = sub.picture;
            userInfo.basicInfo.emailVerified = sub.email_verified;
            userInfo.idProvider = {}
            userInfo.idProvider.google = sub;
            return userInfo;
        }


    })
}
