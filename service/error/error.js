'use strict'
var util = require('util');

var error = {
    "InvalidRequestError": InvalidRequestError,
    "ServerError": ServerError,
    "DBError": DBError,
    "BusinessError": BusinessError,
    "SocialProviderError": SocialProviderError,
    "DebugLog": DebugLog,
    "InfoLog": InfoLog,
    "WarnLog": WarnLog
}

module.exports = error;

function InvalidRequestError(msg) {
    Error.stackTraceLimit = 5;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = msg;
    this.resForUser = {
        "error": this.constructor.name,
        "description": msg
    }
}

function ServerError(msg) {
    Error.stackTraceLimit = 5;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = msg;
    this.resForUser = {
        "error": this.constructor.name,
        "description": msg
    }
}

function DBError(msg) {
    Error.stackTraceLimit = 5;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = msg;
    this.resForUser = {
        "error": this.constructor.name,
        "description": msg
    }
}

function BusinessError(msg) {
    Error.stackTraceLimit = 5;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = msg;
    this.resForUser = {
        "error": this.constructor.name,
        "description": msg
    }
}

function SocialProviderError(msg) {
    Error.stackTraceLimit = 5;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = msg;
    this.resForUser = {
        "error": this.constructor.name,
        "description": msg
    }
}

function DebugLog(msg) {
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(this, this.constructor);
    this.name = "";
    if (typeof msg == 'object') {
        try {
            this.message = JSON.stringify(msg, null, 2);
        } catch (err) {
            this.message = "could not parse DebugLog msg";
        }
    } else {
        this.message = msg;
    }
    Error.stackTraceLimit = 5;
}

function InfoLog(msg) {
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(this, this.constructor);
    this.name = "";
    if (typeof msg == 'object') {
        try {
            this.message = JSON.stringify(msg, null, 2);
        } catch (err) {
            this.message = "could not parse InfoLog msg";
        }
    } else {
        this.message = msg;
    }
    Error.stackTraceLimit = 5;
}

function WarnLog(msg) {
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(this, this.constructor);
    this.name = "";
    if (typeof msg == 'object') {
        try {
            this.message = JSON.stringify(msg, null, 2);
        } catch (err) {
            this.message = "could not parse WarnLog msg";
        }
    } else {
        this.message = msg;
    }
    Error.stackTraceLimit = 5;
}
