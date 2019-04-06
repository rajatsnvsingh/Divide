const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  ownerId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amtOwing: {
    type: Number,
    min: 0,
    required: true
  },
  amtPaid: {
    type: Number,
    min: 0,
    required: true
  },
  split: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: String
});

mongoose.model('Transaction', TransactionSchema);
