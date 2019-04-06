const mongoose = require("mongoose");
const Notification = mongoose.model('Notification');

exports.createNotification = function(notification) {
  return new Promise((resolve, reject) => {
    notification.save(function(err, newNotification) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        //console.log(notification);
        resolve(newNotification);
      }
    });
  })
};

exports.getNotificationsByUserId = function(id) {
  return mongoose
    .model("Notification")
    .find({ targetId: id }, function(err, notifications) {
      if (err) {
        console.error(err);
      } else {
        //console.log(notifications);
        return notifications;
      }
    });
};

exports.getNotification = function(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .model('Notification')
      .find({ _id: id }, function(err, notification) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(notification);
        }
      });
  });
};

exports.deleteNotification = function(id) {
  return Notification.findOneAndDelete(
    { _id: id },
    function(err, deletedNotification) {
      if (err) {
        console.error(err);
      } else {
        return deletedNotification;
      }
    });
};
