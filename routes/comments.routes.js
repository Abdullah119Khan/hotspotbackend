const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createComments, deleteComments } = require('../controller/comments.controller');
const router = express.Router();

router.post('/comments/:id/create', isAuthenticated, createComments);

module.exports = router;