const mongoose = require('mongoose');
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
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  transactions: {
    type: [Schema.ObjectId],
    ref: 'Transaction'
  },
  status: String
});

mongoose.model('Expense', ExpenseSchema);
