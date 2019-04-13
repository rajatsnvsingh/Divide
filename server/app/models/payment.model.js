const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  payerId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  payeeId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  amt: {
    type: Number,
    min: 0.01,
    required: true
  },
  status: { type: Boolean, default: false },
  // false => the payment has not been confirmed yet, and true => the payment has been confirmed.
  expenses: {
    type: [Schema.ObjectId],
    ref: "Expense"
  }
});

mongoose.model("Payment", PaymentSchema);
