const mongoose = require("mongoose");
const expenseController = require("../controllers/expense.controller");
const transactionController = require("../controllers/transaction.controller");
const Expense = mongoose.model("Expense");
const Transaction = mongoose.model("Transaction");

exports.getSummary = function(userId, callback) {
  transactionController
    .getTransactionsConcernedWith(userId)
    .then(function(transactions) {
      let summary_list = [];
      transactions.forEach(function(transaction) {
        let otherId = transaction.ownerId.equals(userId)
          ? transaction.userId
          : transaction.ownerId;

        if (summary_list.filter(e => e.userId.equals(otherId)).length == 0) {
          let summary_item = {};
          summary_item.userId = otherId;
          summary_item.amt = 0;
          summary_list.push(summary_item);
        }
        let summaryIndex = summary_list.findIndex(obj =>
          obj.userId.equals(otherId)
        );
        if (transaction.ownerId.equals(userId)) {
          summary_list[summaryIndex].amt += transaction.amtOwing;
        } else {
          summary_list[summaryIndex].amt -= transaction.amtOwing;
        }
      });

      callback(summary_list);
    });
};
