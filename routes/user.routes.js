const express = require('express');
const { createUser, loginUser } = require('../controller/user.controller');
const { isAuthenticated, checkAdmin, verifyTokenAdmin } = require('../middleware/auth');
const router = express.Router()

router.post('/user/create', verifyTokenAdmin, createUser)
router.post('/user/login', loginUser)

module.exports = router;