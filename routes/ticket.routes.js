const express = require('express');
const { createTicket, getAllTicket, updateTicket, getSingleTicket, closeTicket, holdTicket, rejectTicket, getTicketByUsername } = require('../controller/ticket.controller');
const { verifyApiKey } = require('../middleware/auth');
const router = express.Router();

router.post('/ticket/create', verifyApiKey, createTicket);
router.get('/ticket/all', getAllTicket)
router.get('/ticket/:id', getSingleTicket)
router.put('/ticket/update/:id', updateTicket)
router.put('/ticket/:ticketId/close', closeTicket)
router.put('/ticket/:ticketId/onhold', holdTicket)
router.put('/ticket/:ticketId/reject', rejectTicket)
router.get('/ticket', getTicketByUsername)

module.exports = router;