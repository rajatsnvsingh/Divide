const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String

  },
  expenseId: {
    type: [Schema.ObjectId],
    ref: 'Expense'
  },
  notifications: {
    type: [Schema.ObjectId],
    ref: 'Notification'
  }
});

module.exports = mongoose.model('User', UserSchema);
