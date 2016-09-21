'use strict'
var mongoose = require( 'mongoose');
var error = require(__proot + '/service/error/error');
var log = require(__proot + '/service/shared/log/logService');
var prop = require(__proot + '/properties');

var userSchema = new mongoose.Schema({
	name: String,
	picture: String,
	email: String,
	emailVerified: Boolean,	
	idProvider: {
		google: mongoose.Schema.Types.Mixed
	}

})

var User = mongoose.model( 'Users', userSchema );

var userService = {
	createUser: createUser,
	updateUser: updateUser
}

module.exports = userService;

//model.collection.insert is faster than model.create, as it bypass mongoose validation to go directly to mongodb driver
function createUser(userInfo, idProvider){
	log.debug("entered userService.createUser with idProvider: " + idProvider + " userInfo: " + JSON.stringify( userInfo, null, 4) )
	return new Promise( function( fulfill, reject ) {

		var userd = {};
		if( idProvider==='google' ){
		console.log( "google provider")			
			userd.name = userInfo.name;
			userd.email = userInfo.email;
			userd.picture = userInfo.picture;
			userd.emailVerified = userInfo.email_verified;
			userd.idProvider = {};
			userd.idProvider.google = userInfo;
		}
		User.create( userd , function( err, user){
			if( err ){	
				console.log( "error", err )		
				reject( new error.DBError( "Error creating user-" + err.name + "-" + err.message ) )
			}else{
				console.log("user", user)
				fulfill( user );
			}
		} )

	})
}

function updateUser(){

}
