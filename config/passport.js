var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');

function initPassport(config)
{

    passport.serializeUser(function (identity, done) {
        //what you write to the session
        done(null, identity)
    })

    passport.deserializeUser(function (identity, done) {
        //how you handle what you pull
        done(null, identity)
    })


    passport.use(new GoogleStrategy({

        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL

    },
            function (token, refreshToken, profile, done)
            {
                process.nextTick(function() {
                    var user = {id: profile.id, name: profile.displayName, token: token, refreshToken: refreshToken, email: profile.email[0].value };
                    return done(null,user);
                })
            }

    ));


}

module.exports = initPassport;