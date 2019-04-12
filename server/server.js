// server.js
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var http = require("http").Server(app);
var passportSocketIo = require("passport.socketio");
var io = require("socket.io")(http);
io.origins("*:*");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const fs = require("fs");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");

// Database Configuration ======================================================
var { db } = require("./config/database");

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

app.use(
  session({
    store: sessionStore,
    secret: "dividesecretencryptkey",
    resave: false,
    saveUninitialized: false
  })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// routes ======================================================================
app.use("/api", router);
// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, router, passport);

//FOR PRODUCTION BUILDS, SET TO TRUE
if (false) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "app/public/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/build", "index.html"));
  });
}

io.use(
  passportSocketIo.authorize({
    key: "connect.sid",
    store: sessionStore,
    secret: "dividesecretencryptkey",
    passport: passport,
    cookieParser: cookieParser,
    fail: onAuthorizeFail // *optional* callback on fail/error
  })
);

// launch our backend into a port
http.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

const socketManager = require("./app/socketManager.js");
io.on("connection", socket => socketManager.clientHandler(socket));

function onAuthorizeFail(data, message, error, accept) {
  // error indicates whether the fail is due to an error or just a unauthorized client
  if (error) throw new Error(message);
  // send the (not-fatal) error-message to the client and deny the connection
  return accept(new Error(message));
}
