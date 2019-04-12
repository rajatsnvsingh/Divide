const expenseService = require("./services/expense.service");
const notificationService = require("./services/notification.service");
const paymentService = require("./services/payment.service");
const summaryService = require("./services/summary.service");
const transactionService = require("./services/transaction.service");
const userService = require("./services/user.service");

const Debug = true;
const print = function(string) {
  if (Debug) console.log("Debug: " + string);
};

let userSockets = [];
let checkAuth = function(socket) {
  if (socket.request.user && socket.request.user.logged_in) {
    return true;
  } else {
    console.log("Not-Authenticated Request");
    return false;
  }
};

module.exports = function(socket) {
  socket.userId = socket.request.user._id;
  //console.log(socket.request.user._id);
  //socket.userId = "5c92a0bf65b2dc4137072057";
  userSockets.push(socket);
  socket.on("all_expenses", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested expenses!");
    expenseService.getExpensesByUserId(socket.userId, callback);
  });
};
