const mongoose = require("mongoose");
const User = mongoose.model('User');

exports.createUser = function(user) {
  return user.save(function(err, newUser) {
    if (err) {
      console.error(err);
    } else {
      //console.log(user);
      return newUser;
    }
  });
};

exports.getUsers = function() {
  return mongoose.model("User").find(function(err, users) {
    if (err) {
      console.error(err);
    } else {
      //console.log(users);
      return users;
    }
  });
};

exports.getUser = function(id) {
  return mongoose.model("User").findOne({ _id: id }, function(err, user) {
    if (err) {
      console.error(err);
    } else {
      //console.log(user);
      return user;
    }
  });
};

exports.updateUser = function(user) {
  return User.findOneAndUpdate(
    {_id: user._id},
    user,
    { new: true},
    function(err, updatedUser) {
      if (err) {
        console.error(err);
      } else {
        return updatedUser;
      }
    }
  )
};

exports.deleteUser = function(user) {
  return mongoose
    .model("User")
    .findOneAndDelete(user, function(err, deletedUser) {
      if (err) {
        console.error(err);
      } else {
        //console.log(deletedUser);
        return deletedUser;
      }
    });
};
