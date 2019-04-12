const expenseService = require("./services/expense.service");
const notificationService = require("./services/notification.service");
const paymentService = require("./services/payment.service");
const userService = require("./services/user.service");

// Client_started: Sent when the client first initializes to get userId, photo, name, etc.
// New_payment
// New_expense
// Update_payment - Accept/Reject
// Update_expense
// notification_dismissed

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

module.exports.clientHandler = function(socket) {
  print("user connected");
  socket.userId = socket.request.user._id;
  //console.log(socket.request.user._id);
  //socket.userId = "5cafd0222e9bae3c88654a1a";
  userSockets.push(socket);
  /**
   * All Expense Socket functions
   */
  socket.on("get_expenses", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested expenses!");
    expenseService.getExpensesByUserId(socket.userId, callback);
  });
  socket.on("new_expense", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User sent a new expense!");
    console.log(JSON.parse(data));
    expenseService.createExpense(JSON.parse(data), callback);
  });
  socket.on("update_expense", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User sent a new expense!");
    expenseService.updateExpense(data, callback);
  });
  /**
   * All Payment Socket functions
   */
  socket.on("get_payments", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested payments!");
    paymentService.getPaymentsByUserId(socket.userId, callback);
  });
  /**
   * All Notification Socket functions
   */
  socket.on("get_notifications", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested notifications!");
    notificationService.getAllNotificationsByUserId(socket.userId, callback);
  });

  /**
   * All user info socket functions
   */
  socket.on("get_all_users", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested all users!");
    userService.getAllUsers(callback);
  });
  socket.on("user_info", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested all users!");
    userService.getUserById(socket.userId, callback);
  });
};
