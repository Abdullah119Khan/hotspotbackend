const express = require('express');
const { createManager, loginManager, updateManager, deleteManager, getByIdManager, getAllManager } = require('../controller/manager.controller');
const { isAuthenticated, verifyTokenAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const router = express.Router()

router.post('/manager/create', verifyTokenAdmin, createManager)
router.post('/manager/login', loginManager)
router.get("/manager", getAllManager)
router.put('/manager/update/:id', isAuthenticated, upload.single("avatar"), updateManager)
router.delete('/manager/delete/:id', verifyTokenAdmin, deleteManager)
router.get('/manager/:id', verifyTokenAdmin, getByIdManager)


module.exports = router;