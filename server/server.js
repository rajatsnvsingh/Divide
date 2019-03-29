// server.js
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var http = require('http').Server(app);
var passportSocketIo = require('passport.socketio');
var io = require('socket.io')(http);
io.origins('*:*');
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Database Configuration ======================================================
var {db} = require("./config/database");

fs.readdirSync(__dirname + "/app/models").forEach(function(filename) {
  if (~filename.indexOf(".model.js"))
    require(__dirname + "/app/models/" + filename);
});

fs.readdirSync(__dirname + "/app/routes").forEach(function(filename) {
  if (~filename.indexOf(".route.js"))
    require(__dirname + "/app/routes/" + filename)(router);
});

// Other Configuration =========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parses request bodies to json format
app.use(logger("dev")); //for logging

// Passport Configuration ======================================================
// Sets up a session store with Mongo
var sessionStore = new MongoStore({ mongooseConnection: db });

app.use(session({
  store: sessionStore,
  secret: 'dividesecretencryptkey',
  resave: false,
  saveUninitialized: false
}));

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// routes ======================================================================
app.use('/api', router);
// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, router, passport);

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  store: sessionStore,
  secret: 'dividesecretencryptkey',
  passport: passport,
  cookieParser: cookieParser,
  fail: onAuthorizeFail,     // *optional* callback on fail/error
}));

// launch our backend into a port
http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

io.on('connection', function (socket) {
  console.log("new connection");

  socket.on('test', function (data) {
    // user data from the socket.io passport middleware
    if (socket.request.user && socket.request.user.logged_in) {
      console.log("authenticated message rcvd: " + data.value);
    }
    else {
    console.log("NON-AUTHENTICATED MSG RCVD:" + data.value);
    }
  });
});

function onAuthorizeFail(data, message, error, accept){
  // error indicates whether the fail is due to an error or just a unauthorized client
  if(error)  throw new Error(message);
  // send the (not-fatal) error-message to the client and deny the connection
  return accept(new Error(message));
}
