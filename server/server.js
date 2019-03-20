// server.js
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

// Database Configuration ======================================================
require("./config/database");

// Other Configuration =========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parses request bodies to json format
app.use(logger("dev")); //for logging

// Passport Configuration ======================================================
app.use(passport.initialize());
require("./config/passport");

// routes ======================================================================
app.use('/api', router);
// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, router, passport);

const userController = require('./app/controllers/user.controller');
let UserSchema = require('./app/models/user.model');
let User = mongoose.model('User');
let newUser = new User({
    email: Date.now(),
    name: 'Calvin Bischoff'
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

