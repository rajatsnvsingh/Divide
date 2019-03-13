// config/passport.js

var passport = require("passport");
const keys = require('./authKey');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
//This is our google authentication api
//Strategy instantiation from passport-google-oauth20
//http://www.passportjs.org/packages/passport-google-oauth20/

passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthSecret,
    callbackURL:'/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken) ;
      console.log(refreshToken);
      console.log(profile);
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);