const expenseService = require("../services/expense.service");
const summaryService = require("../services/summary.service");

module.exports = function(router) {
  router.post("/expense", (req, res) => {
    res.send(expenseService.createExpense(req.body));
  });

  router.get("/expense", (req, res) => {
    expenseService.getExpenses().exec(function(err, expenses) {
      res.send(expenses);
    });
  });

  router.get("/summary/:userId", (req, res) => {
    summaryService.getSummary(req.params.userId, function(result) {
      res.send(result);
    });
  });

  router.get("/expense/:userId", (req, res) => {
    expenseService
      .getExpensesByUserId(req.params.userId, function(expenses) {
        res.send(expenses);
      })
  });

  router.put("/expense", (req, res) => {
    expenseService.updateExpense(req.body).exec(function(err, updatedExpense) {
      res.send(updatedExpense);
    });
  });
};
