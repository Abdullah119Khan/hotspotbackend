const express = require('express');
const { createManager, loginManager } = require('../controller/manager.controller');
const { isAuthenticated, verifyTokenAdmin } = require('../middleware/auth');
const router = express.Router()

router.post('/manager/create', verifyTokenAdmin, createManager)
router.post('/manager/login', loginManager)

module.exports = router;