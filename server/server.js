// server.js
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");

// Database Configuration ======================================================
require("./config/database");

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
app.use(passport.initialize());
require("./config/passport");

// routes ======================================================================
app.use("/api", router);
// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, router, passport);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
