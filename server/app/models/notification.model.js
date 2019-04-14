const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  targetId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: Number,
    required: true
    // { expenseAdded: 1, paymentAdded: 2, paymentDeleted: 3, updatedExpense: 4, paymentAccepted: 5}
  },
  expenseId: {
    // Populated if notification associated w/ an expense
    type: Schema.ObjectId,
    ref: "Expense"
  },
  paymentId: {
    // Populated if notification associated w/ a payment
    type: Schema.ObjectId,
    ref: "Payment"
  }, 
  payeeName:{
    type: String
  }
});

mongoose.model("Notification", NotificationSchema);
