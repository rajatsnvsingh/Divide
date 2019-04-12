const mongoose = require("mongoose");
const paymentController = require("../controllers/payment.controller");
const notificationController = require("../controllers/notification.controller");
const transactionController = require("../controllers/transaction.controller");
const expenseController = require("../controllers/expense.controller");
const Payment = mongoose.model("Payment");
const Notification = mongoose.model("Notification");

exports.createPayment = function(jsonObj, callback) {
  let payment = new Payment(jsonObj);
  paymentController.createPayment(payment).then(function(savedPayment) {
    let payeeNotification = new Notification({
      targetId: savedPayment.payeeId,
      type: "New Payment",
      paymentId: savedPayment._id
    });
    notificationController.createNotification(payeeNotification);
    callback(savedPayment);
  });
};

exports.getPaymentsByUserId = function(id, callback) {
  paymentController
    .getPaymentByUserId(id)
    .populate({
      path: "payerId",
      model: "User"
    })
    .populate({
      path: "payeeId",
      model: "User"
    })
    .then(payments => {
      callback(payments);
    });
};

exports.getPayments = function() {
  return paymentController
    .getAllPayments()
    .populate({
      path: "payerId",
      model: "User"
    })
    .populate({
      path: "payeeId",
      model: "User"
    })
    .populate({
      path: "expenses",
      model: "Expense"
    });
};

exports.acceptPayment = function(id, callback) {
  /** Logic:
   * fetch the payment that was accepted
   * get all transactions that match the direction of the payment
   * sort matched transactions by oldest to newest
   * start applying the payment amt to the transactions -- change status if required
   * update transactions in DB
   * add the transactions' expense IDs to the payment
   * create payment notification for the payer
   */
  paymentController.getSinglePayment(id).then(function(payment) {
    transactionController
      .getTransactionsInDirection(payment.payeeId, payment.payerId)
      .then(function(transactions) {
        transactions = transactions.filter(
          transaction => transaction.status === "Pending"
        );
        transactions = transactions.sort(function(transactionA, transactionB) {
          return new Date(transactionA.date) - new Date(transactionB.date);
        });

        let amtAvailable = payment.amt;
        let transactionsToUpdate = [];

        // for each of the transactions in the array
        for (let i = 0; i < transactions.length && amtAvailable !== 0; i++) {
          let amtApplicable =
            transactions[i].amtOwing - transactions[i].amtPaid;
          let amtBeingApplied =
            amtApplicable <= amtAvailable ? amtApplicable : amtAvailable;
          let newPaid = transactions[i].amtPaid + amtBeingApplied;
          transactions[i].amtPaid = Math.round(newPaid * 100) / 100;
          amtAvailable -= amtBeingApplied;
          if (transactions[i].amtOwing === transactions[i].amtPaid)
            transactions[i].status = "Paid";
          transactionsToUpdate.push(transactions[i]);
        }

        transactionController
          .updateMultipleTransactions(transactionsToUpdate)
          .then(function(updatedTransactions) {
            expenseController
              .getExpensesByTransactions(updatedTransactions)
              .then(function(updatedExpenses) {
                // TODO: socket emit updated expenses
                payment.expenses = updatedExpenses;
                payment.status = "Accepted";
                paymentController
                  .updatePayment(payment)
                  .then(function(acceptedPayment) {
                    let acceptPaymentNotification = new Notification({
                      targetId: acceptedPayment.payerId,
                      type: "Accepted Payment",
                      paymentId: acceptedPayment._id
                    });
                    notificationController
                      .createNotification(acceptPaymentNotification)
                      .then(function() {
                        callback(acceptedPayment, updatedTransactions);
                      });
                  });
              });
          });
      });
  });
};

exports.declinePayment = function(id, callback) {
  paymentController.deletePayment(id).then(function(deletedPayment) {
    // create Notification for the user whose payment was declined
    let paymentRejectionNotif = new Notification({
      targetId: deletedPayment.payerId,
      type: "Payment Rejected",
      paymentId: deletedPayment._id
    });
    notificationController
      .createNotification(paymentRejectionNotif)
      .then(function() {
        callback(deletedPayment);
      });
  });
};
