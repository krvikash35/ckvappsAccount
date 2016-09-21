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
            "name": "google",
            "client_id": "342742052739-j842arsnvvgu58j8a3a98deejetgcb8d.apps.googleusercontent.com",
            "client_secret": "FJYh1BBrDVfjRUR4ze7blNKw",
            "oauth2Step1UrlEP": "https://accounts.google.com/o/oauth2/v2/auth?",
            "scope": "email profile",
            "response_type": "code",
            "access_type": "offline",
            "oauth2Step2UrlEP": "https://www.googleapis.com/oauth2/v4/token",
            "iss": "https://accounts.google.com"
        }
    },
    "oauth2": {
        // "callbackurl": "https://accounts.ckvapps.co.in/oauth2callback",
        "callbackurl": "http://localhost:8082/api/oauth2callback"
    }
}

