const mongoose = require('mongoose');

exports.createUser = function(user) {
  return user.save(function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log(user);
      return user;
    }
  });
};

exports.getUsers = function() {
  return mongoose.model('User').find(function(err, users) {
    if (err) {
      console.error(err);
    } else {
      console.log(users);
      return users;
    }
  });
};

exports.getUser = function(id) {
  return mongoose.model('User').find(
    { _id: id },
    function(err, user) {
      if (err) {
        console.error(err);
      } else {
        console.log(user);
        return user;
      }
    }
  );
};

exports.updateUser = function(user) {
  return mongoose.model('User').findByIdAndUpdate(
    user._id,
    user,
    {},
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        return result;
      }
    }
    );
};

exports.deleteUser = function(user) {
  return mongoose.model('User').findOneAndDelete(
    user,
    function(err, deletedUser) {
      if (err) {
        console.error(err);
      } else {
        console.log(deletedUser);
        return deletedUser;
      }
    }
  );
};
