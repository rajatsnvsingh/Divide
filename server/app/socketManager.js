const expenseService = require("./services/expense.service");
const notificationService = require("./services/notification.service");
const paymentService = require("./services/payment.service");
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
let getUserSockets = function(id_list) {
  let filteredSockets = userSockets.filter(socket => {
    return id_list.includes(socket.userId.toString());
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
  socket.on("dismiss_notifications", function(data, callback) {
    if (!checkAuth(socket)) {
      return "User not authenticated!";
    }
    print("User dismissed notification!");
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
  socket.on("")
};
/**
 * Server -> Client socket functions
 */
module.exports.broadcastNotification = function(notification) {
  let targetSockets = getUserSockets([notification.targetId._id.toString()]);
  console.log("number of matching sockets " + targetSockets.length);
  for (socket of targetSockets) {
    socket.emit("incoming_notification", JSON.stringify(notification));
  }
};
module.exports.broadcastExpense = function(Expense) {
  let targedIds = [];
  for (transaction of Expense.transactions) {
    targedIds.push(transaction.userId.toString());
  }
  let targetSockets = getUserSockets(targedIds);
  for (socket of targetSockets) {
    socket.emit("incoming_expense", JSON.stringify(Expense));
  }
};
module.exports.broadcastPayment = function(Payment) {
  let targetSockets = getUserSockets([Payment.payeeId._id.toString()]);
  for (socket of targetSockets) {
    socket.emit("incoming_payment", JSON.stringify(Payment));
  }
};
module.exports.broadcastAcceptedPayment = function(Payment) {
  let targetSockets = getUserSockets([Payment.payeeId._id.toString()]);
  for (socket of targetSockets) {
    socket.emit("accepted_payment", JSON.stringify(Payment));
  }
};
module.exports.broadcastDeletedPayment = function(Payment) {
  let targetSockets = getUserSockets([Payment.payerId.toString()]);
  for (socket of targetSockets) {
    socket.emit("disputed_payment", JSON.stringify(Payment));
  }
};
