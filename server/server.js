// server.js
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const connectionString = require("./config/databaseKey.js");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
const router = express.Router();

// Database Configuration ======================================================
// connect to our database. This can all be moved into config/databse.js
mongoose.connect(connectionString, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
