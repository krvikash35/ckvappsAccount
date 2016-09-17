module.exports = {
  "app": {
    "port": 8082,
    "state": 'CLEAN' //DIRTY
  },
  "db": {
    "uri": "mongodb://localhost",
    "state": 'CLEAN' //DIRTY
  },
  "log": {
    "level": 4, // 0-nothing, 1-error, 2-warn, 3-info, 4-debug
    "method": 1 //1-CONSOLE, 2-FILE
  }
}
