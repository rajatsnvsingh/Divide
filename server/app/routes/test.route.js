const expenseService = require("../services/expense.service");
const summaryService = require("../services/summary.service");
const notificationService = require('../services/notification.service');
const paymentService = require('../services/payment.service');

module.exports = function(router) {
  router.post("/expense", (req, res) => {
    expenseService.createExpense(req.body, function(createdExpense) {
      res.send(createdExpense);
    });
  });

  router.get("/expense", (req, res) => {
    expenseService.getExpenses().exec(function(err, expenses) {
      res.send(expenses);
    });
  });

  router.get("/expense/:userId", (req, res) => {
    expenseService
      .getExpensesByUserId(req.params.userId, function(expenses) {
        res.send(expenses);
      })
  });

  router.put("/expense", (req, res) => {
    expenseService.updateExpense(req.body, function(updatedExpense) {
      res.send(updatedExpense);
    });
  });

  router.get("/summary/:userId", (req, res) => {
    summaryService.getSummary(req.params.userId, function(result) {
      res.send(result);
    });
  });

  router.get('/notification/:userId', (req, res) => {
    notificationService.getAllNotificationsByUserId(req.params.userId, function(notifications) {
      res.send(notifications);
    });
  });

  router.delete('/notification/:notificationId', (req, res) => {
    notificationService.deleteNotification(req.params.notificationId, function(deletedNotification) {
      res.send(deletedNotification);
    })
  });

  router.post('/payment', (req, res) => {
    paymentService.createPayment(req.body, function(newPayment) {
      res.send(newPayment);
    });
  });

  router.get('/payment', (req, res) => {
    paymentService.getPayments().exec(function(err, payments) {
      res.send(payments);
    });
  });

  router.get('/payment/:userId', (req, res) => {
    paymentService.getPaymentsByUserId(req.params.userId).exec(function(err, payments) {
      res.send(payments);
    })
  });
};
