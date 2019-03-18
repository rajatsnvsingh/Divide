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
var io = require('socket.io')(http);
io.origins('*:*')
const router = express.Router();
const session = require('express-session');

// Database Configuration ======================================================
require("./config/database");

// Other Configuration =========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parses request bodies to json format
app.use(logger("dev")); //for logging

// Passport Configuration ======================================================
app.use(session({
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

// launch our backend into a port
http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

io.on('connection', function (socket) {
  console.log("new connection");
  
  socket.on('test', function (data) {
    console.log(data);
  });
});