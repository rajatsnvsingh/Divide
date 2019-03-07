const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const connectionString = require("./connection.js");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const API_PORT = 3001;
const app = express();
const router = express.Router();

//This is our google authentication api
//Strategy instantiation from passport-google-oauth20
//http://www.passportjs.org/packages/passport-google-oauth20/
passport.use(new GoogleStrategy({
  clientID: keys.googleAuthClientID,
  clientSecret: keys.googleAuthSecret,
  callbackURL:'/auth/google/callback'
},(accessToken, refreshToken, profile, done)=>{
//callback function
//data recieved from successful authentication
//can store this in the database ex) email
console.log(accessToken) ;
console.log(refreshToken);
console.log(profile);
}))
//scope/info we're dealing with
//user currently types in localhost:3001/auth/google to log in
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile','email']
}));
//can add redirect code here for sucessful and unsucessful authentication
app.get('/auth/google/callback',passport.authenticate('google'));


// this is our MongoDB database
// const dbRoute =
//   "mongodb+srv://divide:apos@cluster0-dbb3y.mongodb.net/divide_db";

// connects our back end code with the database
//mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.connect(connectionString, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  data = {
    info: "jeez"
  };
  return res.json({ success: true, data: data });
  //   Data.find((err, data) => {
  //     if (err) return res.json({ success: false, error: err });
  //     return res.json({ success: true, data: data });
  //   });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
