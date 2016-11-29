var log4js = require('log4js');
var logger = log4js.getLogger();
var google = require('googleapis');
var googleAuth = require('google-auth-library');

module.exports = function (app, config) {

    var path = require('path');
    var authVars = {

        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL

    };
    var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    //rendering functions must define these first ////////////////////////////

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(createError(errorString, "ErrorClass"));
    }

    var createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };

    app.post('/calendar', function (req, res) {
        // console.log(req.body);
        var error = function (err) {
            reportError(res, err.toString());
        };
        if (!req.user)
        {
            throw new Error("use must be logged in !!!!!");
        }

        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(authVars.clientID, authVars.clientSecret, authVars.callbackUrl);
       // oauth2Client.credentials = req.user.token;
        oauth2Client.setCredentials({
            access_token: req.user.token 
           // refresh_token: 'REFRESH TOKEN HERE'
                     
        });

        var listEvents = function (oauthClient)
        {

            var calendar = google.calendar('v3');
            calendar.events.list({
                auth: oauthClient,
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime'
            }, function (err, response) {
                if (err) {
                    error(err)
                    return;
                }
                var events = response.items;
                if (events.length == 0) {
                    res.json({events: []})

                } else {
                    console.log('Upcoming 10 events:');
                    var eventList = [];
                    for (var i = 0; i < events.length; i++) {
                        var event = events[i];
                        var start = event.start.dateTime || event.start.date;
                        eventList.push(start);
                        //console.log('%s - %s', start, event.summary);
                    }
                    res.status(200);
                    res.json({events: eventList});
                }
            });

        };


        listEvents(oauth2Client);

    });






///////////////////////////////////////////////////////////////////////
// routes
///////////////////////////////////////////////////////////////////////



}