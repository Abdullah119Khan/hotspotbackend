const TicketModel = require("../models/ticket.model");

exports.createComments = async (req, res) => {
  const { body, username } = req.body;
  try {
    const ticket = await TicketModel.findById(req.params.id);

    if(ticket) {
      ticket.comments.unshift({
        body, username
      })
    }
    await ticket.save();

    const updatedTicket = await TicketModel.findById(req.params.id);

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found after update" });
    }
 
    const updatedComments = updatedTicket.comments;

    return res.status(201).json({ message: "comment create successfully", updatedComments})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}


