const mongoose = require("mongoose");
const Payment = mongoose.model('Payment');

exports.createPayment = function(payment) {
  return new Promise((resolve, reject) => {
    payment.save(function(err, savedPayment) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // console.log(savedPayment);
        resolve(savedPayment);
      }
    });
  })

};

exports.getAllPayments = function() {
  return mongoose
    .model('Payment')
    .find({}, function(err, payments) {
      if (err) {
        console.error(err);
      } else {
        // console.log(payments);
        return payments;
      }
    });
};

exports.getSinglePayment = function(id) {
  return mongoose
    .model('Payment')
    .findOne(
      { _id: id },
      function(err, payments) {
        if (err) {
          console.error(err);
        } else {
          // console.log(payments);
          return payments;
        }
      });
};

exports.getPaymentByUserId = function(id) {
  return mongoose
    .model('Payment')
    .find({ $or: [{ payeeId: id }, { payerId: id }] }, function(err, payments) {
      if (err) {
        console.error(err);
      } else {
        return payments;
      }
    });
};

exports.updatePayment = function(payment) {
  return Payment.findOneAndUpdate(
    { _id: payment._id },
    payment,
    { new: true },
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        //console.log(result);
        return result;
      }
    });
};

exports.deletePayment = function(id) {
  return new Promise((resolve, reject) => {
    Payment.findOneAndDelete(
      { _id: id },
      function(err, deletedPayment) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          // console.log(deletedPayment);
          resolve(deletedPayment)
        }
      });
  });
};
