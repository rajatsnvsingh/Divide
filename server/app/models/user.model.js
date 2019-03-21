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
    // default ... TODO: assign default user picture
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
