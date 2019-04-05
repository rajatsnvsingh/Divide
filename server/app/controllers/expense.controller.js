const mongoose = require("mongoose");
const Expense = mongoose.model('Expense');

exports.createExpense = function(expense) {
  return new Promise((resolve, reject) => {
    expense.save(function(err, newExpense) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        //console.log(expense);
        resolve(newExpense);
      }
    });
  });
};

exports.getAllExpenses = function() {
  return mongoose.model("Expense").find({}, function(err, expenses) {
    if (err) {
      console.error(err);
    } else {
      // console.log(expenses);
      return expenses;
    }
  });
};

exports.getExpensesByTransactions = function(userTransactions) {
  return mongoose
    .model('Expense')
    .find({
      transactions: { $in : userTransactions }
    }, function(err, expenses) {
      if (err) {
        console.error(err);
      } else {
        return expenses;
      }
    });
};

exports.getExpense = function(id) {
  return mongoose.model("Expense").find({ _id: id }, function(err, expense) {
    if (err) {
      console.error(err);
    } else {
      //console.log(expense);
      return expense;
    }
  });
};

exports.updateExpense = function(expense) {
  return Expense.findOneAndUpdate({ _id: expense._id }, expense, { new: true }, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        //console.log(result);
        return result;
      }
    });
};

exports.deleteExpense = function(expense) {
  return mongoose
    .model("Expense")
    .findOneAndDelete(expense, function(err, deletedExpense) {
      if (err) {
        console.error(err);
      } else {
        //console.log(deletedExpense);
        return deletedExpense;
      }
    });
};
