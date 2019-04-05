const mongoose = require('mongoose');
const paymentController = require('../controllers/payment.controller');
const notificationController = require('../controllers/notification.controller');
const Payment = mongoose.model('Payment');
const Notification = mongoose.model('Notification');

exports.createPayment = function (jsonObj,) {
  let payment = new Payment(jsonObj);
  paymentController
    .createPayment(payment)
    .then(function(savedPayment) {
      Payment.populate(
        savedPayment,
        {
          path: 'payerId',
          model: 'User'
        }).then(populatedPmt => {
          let payeeNotification = new Notification({
            targetId: populatedPmt.payeeId,
            type: "New Payment",
            message: populatedPmt.payerId.name + ' has payed you $' + populatedPmt.amt,
            paymentId: populatedPmt._id
          });
          notificationController.createNotification(payeeNotification);
      });
    });
};

exports.getPaymentsByUserId = function(id) {
  return paymentController.getPaymentByUserId(id)
    .populate({
      path: 'payerId',
      model: 'User'
    }).populate({
      path: 'payeeId',
      model: 'User'
    });
};

exports.getPayments = function() {
  return paymentController.getAllPayments()
    .populate({
      path: 'payerId',
      model: 'User'
    }).populate({
      path: 'payeeId',
      model: 'User'
    }).populate({
      path: 'expenses',
      model: 'Expense'
    });
};

exports.acceptPayment = function() {

};

exports.declinePayment = function() {

};
