const mongoose = require("mongoose");

exports.createTransaction = function(transaction) {
  return transaction.save(function(err, newTransaction) {
    if (err) {
      console.error(err);
    } else {
      //console.log(newTransaction);
      return newTransaction;
    }
  });
};

exports.getTransactions = function(id) {
  return mongoose
    .model("Transaction")
    .find({ userId: id }, function(err, transactions) {
      if (err) {
        console.error(err);
      } else {
        //console.log(transactions);
        return transactions;
      }
    });
};

exports.getTransactionsConcernedWith = function(id) {
  return mongoose
    .model("Transaction")
    .find({ $or: [{ userId: id }, { ownerId: id }] }, function(
      err,
      transaction
    ) {
      if (err) {
        console.error(err);
      } else {
        //console.log(transaction);
        return transaction;
      }
    });
};

exports.getTransaction = function(id) {
  return mongoose
    .model("Transaction")
    .find({ _id: id }, function(err, transaction) {
      if (err) {
        console.error(err);
      } else {
        //console.log(transaction);
        return transaction;
      }
    });
};

exports.updateTransaction = function(transaction) {
  return mongoose
    .model("Transaction")
    .findByIdAndUpdate(transaction._id, transaction, {}, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        //console.log(result);
        return result;
      }
    });
};

exports.deleteTransaction = function(transaction) {
  return mongoose
    .model("Transaction")
    .findOneAndDelete(transaction, function(err, deletedTransaction) {
      if (err) {
        console.error(err);
      } else {
        //console.log(deletedTransaction);
        return deletedTransaction;
      }
    });
};
