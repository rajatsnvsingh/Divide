const mongoose = require("mongoose");

exports.createNotification = function(notification) {
  return notification.save(function(err, newNotification) {
    if (err) {
      console.error(err);
    } else {
      //console.log(notification);
      return newNotification;
    }
  });
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

exports.deleteNotifications = function(notification) {
  return mongoose
    .model("Notification")
    .findOneAndDelete(notification, function(err, deletedNotif) {
      if (err) {
        console.error(err);
      } else {
        //console.log(deletedNotif);
        return deletedNotif;
      }
    });
};
