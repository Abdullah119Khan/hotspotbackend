const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  mobileNumber: { type: String},
  username: {type: String},
  email: {type: String},
  subject: { type: String},
  dueDate: { type: String},
  channel: { type: String},
  description: { type: String},
  language: { type: String},
  priority: { type: String},
  product: { type: String},
  email: { type: String},
  status: {
    type: String,
    enum: ['open', 'close', 'onhold', 'reject', 'escalate'],
    default: 'open'
  },
  escalationLevel: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    default: 'user',
  },
  comments: [ { body: String, username: String }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true })

const TicketModel = mongoose.model('Tickets', ticketSchema)

module.exports = TicketModel