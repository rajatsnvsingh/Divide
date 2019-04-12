const mongoose = require("mongoose");
const userController = require("../controllers/user.controller");
const User = mongoose.model("User");

exports.getAllUsers = function(callback) {
  userController.getUsers().then(all_users => {
    let strippedUsers = all_users.map(user => {
      let newUser = {};
      newUser.name = user.authentication.google.name;
      newUser.email = user.authentication.google.email;
      newUser._id = user._id;
      return newUser;
    });
    callback(strippedUsers);
  });
};

exports.getUserById = function(id, callback) {
  userController.getUser(id).then(user => callback(user[0]));
};
