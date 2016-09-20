'use strict'
var util = require('util');

var error = {
	"InvalidRequestError": InvalidRequestError,
	"ServerError": ServerError,
	"DBError": DBError,
	"BusinessError": BusinessError
}

module.exports = error;

function InvalidRequestError(msg){
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = msg;	
	this.resForUser = {
		"error": this.constructor.name,
		"description": msg
	}
}

function ServerError(msg){
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = msg;	
	this.resForUser = {
		"error": this.constructor.name,
		"description": msg
	}
}

function DBError(msg){
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = msg;	
	this.resForUser = {
		"error": this.constructor.name,
		"description": msg
	}
}

function BusinessError(msg){
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = msg;		
	this.resForUser = {
		"error": this.constructor.name,
		"description": msg
	}
}
