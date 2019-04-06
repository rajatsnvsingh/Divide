const mongoose = require("mongoose");
const Transaction = mongoose.model('Transaction');

exports.createTransaction = function(transaction) {
  return new Promise((resolve, reject) => {
    transaction.save(function(err, newTransaction) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        //console.log(newTransaction);
        resolve(newTransaction);
      }
    });
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

exports.getTransactionsInDirection = function(payeeId, payerId) {
  //console.log("payerID: " + payerId);
  return mongoose
    .model("Transaction")
    .find(
      {
        userId: payerId,
        ownerId: payeeId
      },
      function(err, transactions) {
        if (err) {
          console.error(err);
        } else {
          return transactions;
        }
      });
};

exports.updateTransaction = function(transaction) {
  return Transaction.findOneAndUpdate(
    { _id: transaction._id },
    transaction,
    { new: true },
    function(err, updatedTransaction) {
      if (err) {
        console.error(err);
      } else {
        // console.log(updatedTransaction);
        return updatedTransaction;
      }
    });
};

exports.updateMultipleTransactions = function(transactions) {
  let count = transactions.length;
  let updatedTransactions = [];
  return new Promise((resolve, reject) => {
    for (let transaction of transactions) {
      this.updateTransaction(transaction).then(function(updatedTransaction) {
        updatedTransactions.push(updatedTransaction);
        count--;
        if (count === 0) {
          resolve(updatedTransactions);
        }
      });
    }
  })

};

exports.deleteTransaction = function(id) {
  return new Promise((resolve, reject) => {
    Transaction.findOneAndDelete(
      { _id: id },
      function(err, deletedTransaction) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          // console.log(deletedTransaction);
          resolve(deletedTransaction);
        }
      });
  });
};
