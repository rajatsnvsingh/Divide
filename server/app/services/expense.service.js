const mongoose = require('mongoose');
const expenseController = require('../controllers/expense.controller');
const transactionController = require('../controllers/transaction.controller');
const Expense = mongoose.model('Expense');
const Transaction = mongoose.model('Transaction');

exports.createExpense = function(jsonObj) {
  let expense = jsonObj;
  let transactionIds = [];

  for (let transaction of expense.transactions) {
    let newTransaction = new Transaction(transaction);
    transactionController.createTransaction(newTransaction);
    transactionIds.push(newTransaction._id);
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
