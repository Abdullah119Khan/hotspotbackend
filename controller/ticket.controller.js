const TicketModel = require("../models/ticket.model");
const { emitNewTicket } = require("../utils/socketServer");

exports.createTicket = async (req, res) => {
  try {
    const newTicket = new TicketModel(req.body)

    await newTicket.save();

    // When someone create ticket they will be immediatly appear on admin dashboard
    emitNewTicket(newTicket, "Ticket are created and emited")

    setTimeout(async () => {
      const managerTicket = await TicketModel.findById(newTicket._id);
      if(managerTicket.status === "open" && managerTicket.escalationLevel === "user") {
        managerTicket.escalationLevel = "manager";
        await managerTicket.save();

        emitNewTicket(managerTicket, "Manager tickets")
        setTimeout(async () => {
          const adminTicket = await TicketModel.findById(newTicket._id);
          if(adminTicket.status === "open" && adminTicket.escalationLevel === "manager") {
            adminTicket.escalationLevel = "admin";
            await adminTicket.save();

            emitNewTicket(adminTicket, "Admin Ticket");

          }
        }, 1 * 60 * 1000)

      }
    }, 1 * 60 * 1000)
    



    return res.status(201).json({ success: true, ticket:newTicket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getAllTicket = async (req, res) => {
  const q = req.query;
  const filter = {
    ...(q.mobileNumber && {mobileNumber: q.mobileNumber}),
    ...(q.username && { username: { $regex: q.username, $options: 'i'}})
  }
  try {
    const tickets = await TicketModel.find(filter)

    return res.status(200).json(tickets)

  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.openTicket = async (req, res) => {
  
  try {
    const openTicket = await TicketModel.find({ status: "open"})

    console.log(openTicket)
    return res.status(200).json({ ticket: openTicket})
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

exports.deleteTickets = async (req, res) => {
  try {
    const deleteTicket = await TicketModel.findByIdAndDelete(req.params.id);

    return res.status(204).json({ message: "Ticket Delete Successfully", ticket:deleteTicket})
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
exports.escalateTicket = async (req, res) => {
  const {ticketId} = req.params;
  try {
    const closeTicket = await TicketModel.findByIdAndUpdate(ticketId, { status: 'escalate' }, { new: true })

    if(!closeTicket) return res.status(404).json({ message: "Ticket Not Found"})

    return res.status(200).json({ message: "ticket escalate success", ticket: closeTicket})
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