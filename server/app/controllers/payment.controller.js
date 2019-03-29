const mongoose = require("mongoose");

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

exports.getPaymentsByPayee = function(id) {
  return mongoose
    .model("Payment")
    .find({ payeeId: id }, function(err, payments) {
      if (err) {
        console.error(err);
      } else {
        //console.log(payments);
        return payments;
      }
    });
};

exports.getPaymentsByPayer = function(id) {
  return mongoose
    .model("Payment")
    .find({ payerId: id }, function(err, payments) {
      if (err) {
        console.error(err);
      } else {
        //console.log(payments);
        return payments;
      }
    });
};

exports.updatePayment = function(payment) {
  return mongoose
    .model("Payment")
    .findByIdAndUpdate(payment._id, payment, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        //console.log(result);
        return result;
      }
    });
};

exports.deletePayment = function(payment) {
  return mongoose
    .model("Payment")
    .findOneAndDelete(payment, function(err, deletedPayment) {
      if (err) {
        console.error(err);
      } else {
        //console.log(deletedPayment);
        return deletedPayment;
      }
    });
};
