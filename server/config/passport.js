// config/passport.js

var passport = require("passport");
const keys = require('./authKey');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
//This is our google authentication api
//Strategy instantiation from passport-google-oauth20
//http://www.passportjs.org/packages/passport-google-oauth20/

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthSecret,
    callbackURL:'/auth/google/callback'
    },
    function(request, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);