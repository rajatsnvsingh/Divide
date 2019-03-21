const mongoose = require('mongoose');

exports.createExpense = function(expense) {
  return expense.save(function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log(expense);
      return expense;
    }
  });
};

exports.getExpenses = function(id) {
  return mongoose.model('Expense').find(
    { ownerId: id },
    function(err, expenses) {
      if (err) {
        console.error(err);
      } else {
        console.log(expenses);
        return expenses;
      }
    }
  );
};

exports.getExpense = function(id) {
  return mongoose.model('Expense').find(
    { _id: id },
    function(err, expense) {
      if (err) {
        console.error(err);
      } else {
        console.log(expense);
        return expense;
      }
    }
  );
};

exports.updateExpense = function(expense, updateParams) {
  return mongoose.model('Expense').findOneAndUpdate(
    expense,
    { $set: updateParams },
    {},
    function(err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        return result;
      }
    }
  );
};

exports.deleteExpense = function(expense) {
  return mongoose.model('Expense').findOneAndDelete(
    expense,
    function(err, deletedExpense) {
      if (err) {
        console.error(err);
      } else {
        console.log(deletedExpense);
        return deletedExpense;
      }
    }
  );
};
