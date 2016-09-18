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
    },
    "idProvider": {
        "google": {
            "client_id": "342742052739-j842arsnvvgu58j8a3a98deejetgcb8d.apps.googleusercontent.com",
            "app_secret": ""
        }
    },
    "oauth2": {
        "callbackurl": "https://accounts.ckvapps.co.in/oauth2callback",
        "callbackurlEncoded": "https%3A%2F%2Faccounts.ckvapps.co.in%2Foauth2callback"
    }
}
