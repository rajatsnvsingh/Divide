const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  targetId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  expenseId: {  // Populated if notification associated w/ an expense
    type: Schema.ObjectId,
    ref: 'Expense'
  },
  paymentId: {  // Populated if notification associated w/ a payment
    type: Schema.ObjectId,
    ref: 'Payment'
  }
});

mongoose.model('Notification', NotificationSchema);
