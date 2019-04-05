const paymentService = require('../services/payment.service');

module.exports = function(router) {
  router.post('/payment', (req, res) => {
    paymentService.createPayment(req.body, function(payee, amt) {
      console.log(payee, amt);
    });

    res.send(200);
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
