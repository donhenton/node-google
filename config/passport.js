var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

function initPassport(appProperties)
{
    
    passport.serializeUser(function (identity, done) {
        //what you write to the session
        done(null, identity)
    })

    passport.deserializeUser(function (identity, done) {
        //how you handle what you pull
        done(null,identity)
    }) 
    
    
    
}

module.exports = initPassport;