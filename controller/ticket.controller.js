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
exports.getTicketByUsername = async (req, res) => {
  const { mobileNumber, username } = req.query;
  try {
    
    const tickets = await TicketModel.find({ $or: [{mobileNumber}, {username}] });

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found for the specified mobile number' });
    }

    return res.status(200).json({ success: true, tickets: tickets });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

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

exports.closeTicket = async (req, res) => {
  const {ticketId} = req.params;
  try {
    const closeTicket = await TicketModel.findByIdAndUpdate(ticketId, { status: 'close' }, { new: true })

    if(!closeTicket) return res.status(404).json({ message: "Ticket Not Found"})

    return res.status(200).json({ message: "ticket close success", ticket: closeTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.holdTicket = async (req, res) => {
  const {ticketId} = req.params;
  try {
    const closeTicket = await TicketModel.findByIdAndUpdate(ticketId, { status: 'onhold' }, { new: true })

    if(!closeTicket) return res.status(404).json({ message: "Ticket Not Found"})

    return res.status(200).json({ message: "ticket On Hold success", ticket: closeTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}
exports.rejectTicket = async (req, res) => {
  const {ticketId} = req.params;
  try {
    const rejectTicket = await TicketModel.findByIdAndUpdate(ticketId, { status: 'reject' }, { new: true })

    if(!rejectTicket) return res.status(404).json({ message: "Ticket Not Found"})

    return res.status(200).json({ message: "ticket reject success", ticket: rejectTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}