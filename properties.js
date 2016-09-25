module.exports = {
    "app": {
        "port": process.env.CKVAPPS_ACCOUNT_APP_PORT,
        "state": 'CLEAN' //DIRTY OR CLEAN
    },
    "db": {
        "uri": process.env.CKVAPPS_ACCOUNT_DB_URL,
        "state": 'CLEAN' //DIRTY OR CLEAN
    },
    "log": {
        "level": 4, // 0-nothing, 1-error, 2-warn, 3-info, 4-debug
        "method": 1 //1-CONSOLE, 2-FILE
    },
    "idProvider": {
        "google": {
            "name": "google",
            "client_id": process.env.CKVAPPS_ACCOUNT_GOOGLE_CLIENT_ID,
            "client_secret": process.env.CKVAPPS_ACCOUNT_GOOGLE_CLIENT_SECRET,
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
        "callbackurl": "http://localhost:8082/api/oauth2callback",
        "secret": process.env.CKVAPPS_ACCOUNT_SERVER_SECRET,
        "iss": "https://accounts.ckvapps.co.in"
    }
}
