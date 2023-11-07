const express = require('express');
const { createTicket, getAllTicket, updateTicket, getSingleTicket } = require('../controller/ticket.controller');
const { verifyApiKey } = require('../middleware/auth');
const router = express.Router();

router.post('/ticket/create', verifyApiKey, createTicket);
router.get('/ticket/all', getAllTicket)
router.get('/ticket/:id', getSingleTicket)
router.put('/ticket/update/:id', updateTicket)

module.exports = router;