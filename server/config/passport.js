// config/passport.js

var passport = require("passport");
const keys = require('./authKey');
const mongoose = require("mongoose");

// load up the user model
var User = mongoose.model('User');

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
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {
        // try to find the user based on their google id
        User.findOne({ 'authentication.google.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                console.log("found user");
                // if a user is found, log them in
                return done(null, user);
            } else {
              console.log("creating new user");
                // if the user isnt in our database, create a new user
                var newUser= new User();
                // set all of the relevant information
                newUser.authentication.google.id    = profile.id;
                newUser.authentication.google.token = accessToken;
                newUser.authentication.google.name  = profile.displayName;
                newUser.authentication.google.email = profile.emails[0].value; // pull the first email
                newUser.name = profile.displayName;
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
      });
    }
  )
);