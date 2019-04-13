const expenseService = require("./services/expense.service");
const notificationService = require("./services/notification.service");
const paymentService = require("./services/payment.service");
const userService = require("./services/user.service");

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
let getUserSockets = function(id_list) {
  let filteredSockets = userSockets.filter(socket => {
    //return socket.userId === id
    return id_list.indexOf(socket.userId) > -1;
  });
  return filteredSockets;
};

module.exports.clientHandler = function(socket) {
  print("user connected");
  socket.userId = socket.request.user._id;
  //console.log(socket.request.user._id);
  //socket.userId = "5cafd0222e9bae3c88654a1a";
  userSockets.push(socket);
  socket.on("disconnect", function() {
    userSockets = userSockets.filter(savedSocket => savedSocket !== socket);
    print("A user disconnected!");
  });
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
    expenseService.createExpense(JSON.parse(data), callback);
  });
  socket.on("update_expense", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User sent a new expense!");
    expenseService.updateExpense(JSON.parse(data), callback);
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
  socket.on("new_payment", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User sent a new payment!");
    paymentService.createPayment(JSON.parse(data), callback);
  });
  socket.on("accept_payment", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User accepted a payment!");
    paymentService.acceptPayment(JSON.parse(data)._id, callback);
  });
  socket.on("decline_payment", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User declined a payment!");
    paymentService.declinePayment(JSON.parse(data)._id, callback);
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
  socket.on("dismiss_notifications", function(callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User requested notifications!");
    notificationService.deleteNotification(JSON.parse(data)._id, callback);
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
/**
 * Server -> Client socket functions
 */
module.exports.broadcastNotification = function(notification) {
  let targetSockets = getUserSockets([notification.targetId]);
  for (socket of targetSockets) {
    socket.emit("incoming_notification", JSON.stringify(notification));
  }
};
module.exports.broadcastExpense = function(Expense) {
  let targedIds = [];
  for (transaction of Expense.transactions) {
    targedIds.push(transaction.userId);
  }
  let targetSockets = getUserSockets(targedIds);
  for (socket of targetSockets) {
    socket.emit("incoming_expense", JSON.stringify(Expense));
  }
};
module.exports.broadcastPayment = function(Payment) {
  let targetSockets = getUserSockets([Payment.payeeId]);
  for (socket of targetSockets) {
    socket.emit("incoming_payment", JSON.stringify(notification));
  }
};
