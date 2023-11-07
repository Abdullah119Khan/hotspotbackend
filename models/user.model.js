const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'full name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  mobile: {
    type: Number,
    required: [true, 'mobile number is required']
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'manager'],
    default: 'user'
  }
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel