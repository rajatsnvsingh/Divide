const mongoose = require('mongoose');
const expenseController = require('../controllers/expense.controller');
const transactionController = require('../controllers/transaction.controller');
const notificationController = require('../controllers/notification.controller');
const Expense = mongoose.model('Expense');
const Transaction = mongoose.model('Transaction');
const Notification = mongoose.model('Notification');

exports.createExpense = function(expenseJSON, callback) {
  let expense = expenseJSON;
  let transactionIds = [];
  let count = expense.transactions.length;

  for (let transaction of expense.transactions) {
    let newTransaction = new Transaction(transaction);

    transactionController.createTransaction(newTransaction).then(function(createdTransaction) {
      transactionIds.push(createdTransaction._id);
      count--;

      if (count === 0) {
        expense.transactions = transactionIds;
        let newExpense = new Expense(expense);
        expenseController.createExpense(newExpense).then(function(createdExpense) {
          Expense.populate(
            createdExpense,
            {
              path: 'transactions',
              model: 'Transaction'
            }).then(function(populatedExpense) {
              for (let createdTransaction of populatedExpense.transactions) {
                let expenseNotif = new Notification({
                  targetId: createdTransaction.userId,
                  type: 'Added Expense',
                  expenseId: createdExpense._id
                });
                notificationController.createNotification(expenseNotif);
              }
              callback(createdExpense);
            });
        });
      }
    });
  }
};

exports.getExpensesByUserId = function(id, callback) {
  transactionController.getTransactionsConcernedWith(id).then(function(transactions) {
    expenseController.getExpensesByTransactions(transactions).then(expenses => {
      Expense.populate(
        expenses,
        [
          {
            path: 'ownerId',
            model: 'User'
          },
          {
            path: 'transactions',
            model: 'Transaction'
          }
        ]).then(populatedExpenses => {
          callback(populatedExpenses);
        }
      );
    });
  });
};

exports.updateExpense = function(expenseJSON, callback) {
  // Update all transactions
  transactionController.updateMultipleTransactions(expenseJSON.transactions).then(function(updatedTransactions) {
    for (let transaction of updatedTransactions) {
      let updateNotification = new Notification({
        targetId: transaction.userId,
        type: 'Updated Expense',
        expenseId: expenseJSON._id
      });
      notificationController.createNotification(updateNotification);
    }
  });
  // Update expense
  expenseController
    .updateExpense(expenseJSON)
    .then(function(expense) {
      Expense.populate(
        expense,
        [
          {
            path: 'ownerId',
            model: 'User'
          },
          {
            path: 'transactions',
            model: 'Transaction'
          }
        ]).then(function(updatedExpense) {
          callback(updatedExpense);
      });
    });
};

exports.deleteExpense = function(id, callback) {
  // Delete expense
  expenseController.deleteExpense(id).then(function(deletedExpense) {
    let count = deletedExpense.transactions.length;

    // Delete the expense's transactions
    for (let transactionId of deletedExpense.transactions) {
      transactionController.deleteTransaction(transactionId).then(function(deletedTransaction) {
        let deleteExpenseNotification = new Notification({
          targetId: deletedTransaction.userId,
          type: 'Deleted Expense',
          expenseId: deletedExpense._id
        });
        // Notify the payee of each transaction that the expense has been deleted
        notificationController.createNotification(deleteExpenseNotification).then(function() {
          count--;
          if (count === 0) {
            callback(deletedExpense);
          }
        });
      });
    }
  });
};
