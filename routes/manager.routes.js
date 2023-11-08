const express = require('express');
const { createManager, loginManager, updateManager, deleteManager } = require('../controller/manager.controller');
const { isAuthenticated, verifyTokenAdmin } = require('../middleware/auth');
const router = express.Router()

router.post('/manager/create', verifyTokenAdmin, createManager)
router.post('/manager/login', loginManager)
router.put('/manager/update/:id', updateManager)
router.delete('/manager/delete/:id', deleteManager)

module.exports = router;