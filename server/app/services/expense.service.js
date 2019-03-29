const mongoose = require('mongoose');
const expenseController = require('../controllers/expense.controller');
const transactionController = require('../controllers/transaction.controller');
const notificationController = require('../controllers/notification.controller');
const Expense = mongoose.model('Expense');
const Transaction = mongoose.model('Transaction');
const Notification = mongoose.model('Notification');

exports.createExpense = function(jsonObj) {
  let expense = jsonObj;
  let transactionIds = [];

  for (let transaction of expense.transactions) {
    let newTransaction = new Transaction(transaction);
    transactionController.createTransaction(newTransaction);
    transactionIds.push(newTransaction._id);
    Transaction.populate(
      newTransaction,
      {
        path: 'ownerId',
        model: 'User'
      })
      .then(populatedTransaction => {
        let expenseNotif = new Notification({
          targetId: newTransaction.userId,
          type: 'Added Expense',
          message: populatedTransaction.ownerId.name + ' has added you to an expense. You owe ' + populatedTransaction.ownerId.name + ' $' + populatedTransaction.amtOwing,
          expenseId: expense._id
        });
        notificationController.createNotification(expenseNotif);
      });
  }

  expense.transactions = transactionIds;
  let newExpense = new Expense(expense);

  return expenseController.createExpense(newExpense);
};

exports.getExpenses = function() {
  return expenseController.getAllExpenses().populate({
    path: 'transactions',
    model: 'Transaction'
  });
};

exports.getExpense = function(id) {
  return expenseController.getExpense(id).populate({
    path: 'transactions',
    model: 'Transaction'
  });
};

exports.updateExpense = function(expenseJSON) {
  return expenseController.updateExpense(expenseJSON);
};
