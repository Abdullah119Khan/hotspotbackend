const TicketModel = require("../models/ticket.model");

exports.createComments = async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.params.id);

    if(ticket) {
      ticket.comments.unshift({
        body: req.body.body, username: req.body.username
      })
    }

    await ticket.save();
    return res.status(201).json({ message: "comment create successfully", ticket})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}


