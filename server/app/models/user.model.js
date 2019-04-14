const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  authentication: {
    local: {
      email: String,
      password: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: '/images/default.png'
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

mongoose.model('User', UserSchema);
