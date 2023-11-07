const TicketModel = require("../models/ticket.model");

exports.createTicket = async (req, res) => {
  try {
    const newTicket = new TicketModel(req.body)

    const savedTicket = await newTicket.save();

    return res.status(201).json({ success: true, ticket: savedTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await TicketModel.find()

    return res.status(200).json({ success: true, tickets: tickets})

  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getSingleTicket = async (req, res) => {
  try {
    const getTicket = await TicketModel.findById(req.params.id)

    return res.status(200).json({ tickets: getTicket})
  } catch(err) {
    return res.status(err.message)
  }
}

exports.updateTicket = async (req, res) => {
  try {
    const updateTicket = await TicketModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    return res.status(201).json({ message: "ticket updated successfully", ticket: updateTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}