const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  mobileNumber: { type: String},
  subject: { type: String},
  dueDate: { type: String},
  channel: { type: String},
  description: { type: String},
  language: { type: String},
  priority: { type: String},
  product: { type: String},
  status: {
    type: String,
    enum: ['open', 'close', 'onhold'],
    default: 'open'
  }
}, { timestamps: true })

const TicketModel = mongoose.model('Tickets', ticketSchema)

module.exports = TicketModel