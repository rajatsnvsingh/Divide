const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    data: Buffer,
    // default: ... TODO: Set default for user picture
    contentType: String
  },
  password: {
    type: String,
    required: true
  },
  googleId: String,
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
