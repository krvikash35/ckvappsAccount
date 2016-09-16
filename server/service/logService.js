'use strict'
/*
*Module dependencies
*/
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var prop = require(__proot + "/server/properties")
/*
logLevel: 0-nothing, 1-error, 2-warn, 3-info
logMethod:1-CONSOLE, 2-FILE
fileLoc:
*/
let defaults = {
  logLevel: prop.log.level || 1,
  logMethod: prop.log.method || 1,
  fileLoc: __proot+'/app.log'
}

function Logger(options){
  EventEmitter.call(this);
  let config = options;

  this.error = error;
  this.warn = warn;
  this.info = info;
  this.debug = debug;
  this.setConfig = setConfig;
  this.getConfig = getConfig;

   function error(msg){
    if(config.logLevel>=1){
      log.call(this, 'error', msg)
    }
  }
  function debug(msg){
    if(config.logLevel>=4){
      log.call(this, 'debug', msg)
    }
  }

  function warn(msg){
    if(config.logLevel>=2){
      log('warn', msg)
    }
  }

  function info(msg){
    if(config.logLevel>=3){
      log('info', msg)
    }
  }

  function setConfig(options){
    if(options){
      if(options.logLevel){
        if(options.logLevel>3 || options.logLevel<0){
          this.emit('configError', 'logLevel must be between 0 and 3')
        }else {
          config.logLevel = options.logLevel;
        }
      }
      if(options.logMethod){
        if(options.logMethod>2 || options.logMethod<1){
          this.emit('configError', 'logMethod must be between 1 and 2')
        }else {
          config.logMethod = options.logMethod;
        }
      }
    }
  }

  function getConfig(){
    return config;
  }

  function log(type, msg){
    let currentTS = new Date().toUTCString()
     if(config.logMethod == 2){
       msg = "[" + currentTS + "]" + "--->[" + msg + "]\n"
      switch (type) {
        case 'error':
          msg = "[ERROR]"+msg;
          break;
        case 'warn':
          msg = "[WARN]"+msg;
          break;
        case 'info':
          msg = "[INFO]"+msg;
          break;
        case 'debug':
          msg = "[DEBUG]"+msg;
          break;
      }
      fs.appendFile(config.fileLoc, msg, (err, msg) => {
          if(err){
            this.emit('configError', err)
          }
        })

    }else {
      switch (type) {
        case 'error':
          console.log('%s[ERROR]%s  [%s] --->[%s]', "\x1b[41m", "\x1b[0m", currentTS, msg );
          break;
        case 'warn':
          console.log('%s[WARN]%s  [%s] --->[%s]', "\x1b[43m", "\x1b[0m", currentTS, msg );
          break;
        case 'info':
          console.log('%s[INFO]%s  [%s] --->[%s]', "\x1b[42m", "\x1b[0m", currentTS, msg );
          break;
        case 'debug':
          console.log('%s[DEBUG]%s  [%s] --->[%s]', "\x1b[35m", "\x1b[0m", currentTS, msg );
          break;
      }
    }
  }

}

Logger.prototype = Object.create(EventEmitter.prototype);
Logger.prototype.constructor = Logger;

/*
*expose object of logger
*/
exports = module.exports = new Logger(defaults);
