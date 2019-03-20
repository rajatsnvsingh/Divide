const mongoose = require('mongoose');
const User = require('../models/user.model');

exports.user_list = function() {
    return mongoose.model('User').find(function(err, users) {
       if (err) {
           console.error(err);
       } else {
           console.log(users);
           return users;
       }
    });
};

exports.user_detail = function(id) {
  return mongoose.model('User').find({userId: id}, function(err, user) {
     if (err) {
         console.error(err);
     } else {
         console.log(user);
         return user;
     }
  });
};

exports.new_user = function(user) {
  return user.save(function(err) {
      if (err) {
          console.error(err);
      } else {
          console.log(user);
          return user;
      }
  })
};
