const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amtOwing: {
    type: Number,
    min: 0.01,
    required: true
  },
  amtPayed: {
    type: Number,
    min: 0,
    required: true
  },
  split: {
    type: [Schema.ObjectId],
    ref: 'User'
  },
  status: String
});

mongoose.model('Transaction', TransactionSchema);
