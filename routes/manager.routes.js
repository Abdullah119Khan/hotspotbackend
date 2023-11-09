const express = require('express');
const { createManager, loginManager, updateManager, deleteManager } = require('../controller/manager.controller');
const { isAuthenticated, verifyTokenAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const router = express.Router()

router.post('/manager/create', verifyTokenAdmin, createManager)
router.post('/manager/login', loginManager)
router.put('/manager/update/:id', isAuthenticated, upload.single("avatar"), updateManager)
router.delete('/manager/delete/:id', verifyTokenAdmin, deleteManager)

module.exports = router;