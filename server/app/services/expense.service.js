const mongoose = require('mongoose');
const expenseController = require('../controllers/expense.controller');
const transactionController = require('../controllers/transaction.controller');
const notificationController = require('../controllers/notification.controller');
const Expense = mongoose.model('Expense');
const Transaction = mongoose.model('Transaction');
const Notification = mongoose.model('Notification');

exports.createExpense = function(jsonObj, callback) {
  let expense = jsonObj;
  let transactionIds = [];

  for (let transaction of expense.transactions) {
    let newTransaction = new Transaction(transaction);

    transactionController.createTransaction(newTransaction).then(function(createdTransaction) {
      transactionIds.push(createdTransaction._id);

      let expenseNotif = new Notification({
        targetId: createdTransaction.userId,
        type: 'Added Expense',
        expenseId: expense._id
      });
      notificationController.createNotification(expenseNotif);
    });
  }

  expense.transactions = transactionIds;
  let newExpense = new Expense(expense);
  expenseController
    .createExpense(newExpense)
    .then(function(createdExpense) {
      callback(createdExpense);
  });
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
      });
    });
  });
};

exports.updateExpense = function(expenseJSON, callback) {
  expenseController.updateExpense(expenseJSON).then(function(expense) {
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
        console.log(updatedExpense.transactions);
        for (let transaction of updatedExpense.transactions) {
          let updateNotif = new Notification({
            targetId: transaction.userId,
            type: 'Updated Expense',
            expenseId: updatedExpense._id
          });
          notificationController.createNotification(updateNotif);
        }
        callback(updatedExpense);
      });
  });
};
