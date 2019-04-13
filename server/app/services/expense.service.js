const mongoose = require("mongoose");
const expenseController = require("../controllers/expense.controller");
const transactionController = require("../controllers/transaction.controller");
const notificationService = require("../services/notification.service");
const socketManager = require('../socketManager');
const Expense = mongoose.model("Expense");
const Transaction = mongoose.model("Transaction");
const Notification = mongoose.model("Notification");

exports.createExpense = function(expenseJSON, callback) {
  let expense = expenseJSON;
  let transactionIds = [];
  let count = expense.transactions.length;

  for (let transaction of expense.transactions) {
    let newTransaction = new Transaction(transaction);

    transactionController
      .createTransaction(newTransaction)
      .then(function(createdTransaction) {
        transactionIds.push(createdTransaction._id);
        count--;

        if (count === 0) {
          expense.transactions = transactionIds;
          let newExpense = new Expense(expense);
          expenseController
            .createExpense(newExpense)
            .then(function(createdExpense) {
              Expense.populate(createdExpense,
                [
                  {
                    path: "ownerId",
                    model: "User"
                  },
                  {
                    path: "transactions",
                    model: "Transaction",
                    populate: {
                      path: "userId",
                      model: "User"
                    }
                  }
              ]).then(function(populatedExpense) {
                for (let createdTransaction of populatedExpense.transactions) {
                  let expenseNotif = new Notification({
                    targetId: createdTransaction.userId,
                    type: 1,
                    expenseId: createdExpense._id
                  });
                  notificationService.createNotification(expenseNotif, function() {});
                  socketManager.broadcastExpense(populatedExpense);
                  // notificationController.createNotification(expenseNotif);
                }
                callback(createdExpense);
              });
            });
        }
      });
  }
};

exports.getExpensesByUserId = function(id, callback) {
  transactionController
    .getTransactionsConcernedWith(id)
    .then(function(transactions) {
      expenseController
        .getExpensesByTransactions(transactions)
        .then(expenses => {
          Expense.populate(expenses, [
            {
              path: "ownerId",
              model: "User"
            },
            {
              path: "transactions",
              model: "Transaction",
              populate: {
                path: "userId",
                model: "User"
              }
            }
          ]).then(populatedExpenses => {
            for (let expense of populatedExpenses) {
              let expenseStatus = 2; //2-> open
              for (let transaction of expense.transactions) {
                if (transaction.amtOwing > transaction.amtPaid) {
                  break;
                }
                expenseStatus = 3;
              }
              expense.status = expenseStatus;
            }
            callback(populatedExpenses);
          });
        });
    });
};

exports.updateExpense = function(expenseJSON, callback) {
  // Update all transactions
  transactionController
    .updateMultipleTransactions(expenseJSON.transactions)
    .then(function(updatedTransactions) {
      for (let transaction of updatedTransactions) {
        let updateNotification = new Notification({
          targetId: transaction.userId,
          type: 4,
          expenseId: expenseJSON._id
        });
        notificationService.createNotification(updateNotification, function() {});
      }
    });
  // Update expense
  expenseController.updateExpense(expenseJSON).then(function(expense) {
    Expense.populate(expense, [
      {
        path: "ownerId",
        model: "User"
      },
      {
        path: "transactions",
        model: "Transaction",
        populate: {
          path: "userId",
          model: "User"
        }
      }
    ]).then(function(updatedExpense) {
      let expenseStatus = 2; //2-> open
      for (let transaction of updatedExpense.transactions) {
        if (transaction.amtOwing > transaction.amtPaid) {
          break;
        }
        expenseStatus = 3;
      }
      updatedExpense.status = expenseStatus;
      socketManager.broadcastExpense(updatedExpense);
      callback(updatedExpense);
    });
  });
};

// exports.deleteExpense = function(id, callback) {
//   // Delete expense
//   expenseController.deleteExpense(id).then(function(deletedExpense) {
//     let count = deletedExpense.transactions.length;
//
//     // Delete the expense's transactions
//     for (let transactionId of deletedExpense.transactions) {
//       transactionController
//         .deleteTransaction(transactionId)
//         .then(function(deletedTransaction) {
//           let deleteExpenseNotification = new Notification({
//             targetId: deletedTransaction.userId,
//             type: 0,
//             expenseId: deletedExpense._id
//           });
//           // Notify the payee of each transaction that the expense has been deleted
//           notificationService.createNotification(deleteExpenseNotification, function() {
//             count--;
//             if (count === 0) {
//               callback(deletedExpense);
//             }
//           });
//         //   notificationController
//         //     .createNotification(deleteExpenseNotification)
//         //     .then(function() {
//         //       count--;
//         //       if (count === 0) {
//         //         callback(deletedExpense);
//         //       }
//         //     });
//         });
//     }
//   });
// };
