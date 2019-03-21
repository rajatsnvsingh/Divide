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

fs.readdirSync(__dirname + '/app/models').forEach(function(filename) {
  if (~filename.indexOf('.model.js')) require(__dirname + '/app/models/' + filename)
});

// Load Controllers & Models. TEMPORARY, will be split up into routes
const userController = require('./app/controllers/user.controller');
const notifController = require('./app/controllers/notification.controller');
const pmtController = require('./app/controllers/payment.controller');
const expenseController = require('./app/controllers/expense.controller');
const transactionController = require('./app/controllers/transaction.controller');
let User = mongoose.model('User');
let Notification = mongoose.model('Notification');
let Payment = mongoose.model('Payment');
let Expense = mongoose.model('Expense');
let Transaction = mongoose.model('Transaction');

// Write code here for testing controllers


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

