const express = require('express');
const { createChat } = require('../controller/chatbot.controller');
const router = express.Router();

router.post("/chatbot", createChat)

module.exports = router;