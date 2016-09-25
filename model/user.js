'use strict'
var dbcon = require(__proot + '/config/dbConfig').getConnection();
var mongoose = require('mongoose')
var prop = require(__proot + '/properties');
var logger = require('logat')
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
    getOrCreateGoogleSub: getOrCreateGoogleSub
}

module.exports = userService;

//model.collection.insert is faster than model.create, as it bypass mongoose validation to go directly to mongodb driver
function getOrCreateGoogleSub(sub) {
    logger.debug();
    logger.info('getOrCreateGoogleSub with sub: ', sub)

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
