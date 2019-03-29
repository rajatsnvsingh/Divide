const connectionString = require("./databaseKey");
const mongoose = require("mongoose");

// connect to our database. This can all be moved into config/databse.js
mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = { "db": db};