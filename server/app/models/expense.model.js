const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  totalAmt: {
    type: Number,
    min: 0.01,
    required: true
  },
  ownerId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  transactions: {
    type: [Schema.ObjectId],
    ref: "Transaction"
  },
  status: Number
  //{Pending: 1, Open: 2, Closed: 3}
});

mongoose.model("Expense", ExpenseSchema);
