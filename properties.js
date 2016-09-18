module.exports = {
    "app": {
        "port": 8082,
        "state": 'CLEAN' //DIRTY OR CLEAN
    },
    "db": {
        "uri": "mongodb://localhost",
        "state": 'CLEAN' //DIRTY OR CLEAN
    },
    "log": {
        "level": 4, // 0-nothing, 1-error, 2-warn, 3-info, 4-debug
        "method": 1 //1-CONSOLE, 2-FILE
    }
}
