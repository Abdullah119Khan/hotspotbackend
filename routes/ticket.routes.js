const express = require('express');
const { createTicket, getAllTicket, updateTicket, getSingleTicket, closeTicket, holdTicket, rejectTicket, getTicketByUsername, escalateTicket, deleteTickets } = require('../controller/ticket.controller');
const { verifyApiKey } = require('../middleware/auth');
const router = express.Router();

router.post('/ticket/create', verifyApiKey, createTicket);
router.get('/ticket/all', getAllTicket)
router.get('/ticket/:id', getSingleTicket)
router.put('/ticket/update/:id', updateTicket)
router.delete("/ticket/delete/:id", deleteTickets)
router.put('/ticket/:ticketId/close', closeTicket)
router.put('/ticket/:ticketId/onhold', holdTicket)
router.put('/ticket/:ticketId/reject', rejectTicket)
router.put('/ticket/:ticketId/escalate', escalateTicket)

module.exports = router;