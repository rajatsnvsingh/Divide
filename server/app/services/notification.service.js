const mongoose = require("mongoose");
const notificationController = require("../controllers/notification.controller");
const Notification = mongoose.model("Notification");
const socketManager = require("../socketManager.js");

exports.getAllNotificationsByUserId = function(id, callback) {
  notificationController
    .getNotificationsByUserId(id)
    .then(function(notifications) {
      Notification.populate(notifications, [
        {
          path: "targetId",
          model: "User"
        },
        {
          path: "expenseId",
          model: "Expense"
        },
        {
          path: "paymentId",
          model: "Payment"
        }
      ]).then(function(populatedNotifications) {
        callback(populatedNotifications);
      });
    });
};
exports.createNotification = function(notification, callback) {
  notificationController.createNotification(notification).then(function(notif) {
    socketManager.broadcastNotification(notif);
    callback(notif);
  });
};
exports.deleteNotification = function(id, callback) {
  notificationController
    .deleteNotification(id)
    .then(function(deletedNotification) {
      callback(deletedNotification);
    });
};
