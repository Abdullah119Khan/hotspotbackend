const express = require('express');
const { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controller/user.controller');
const { isAuthenticated, checkAdmin, verifyTokenAdmin } = require('../middleware/auth');
const router = express.Router()

router.post('/user/create', verifyTokenAdmin, createUser)
router.post('/user/login', loginUser);
router.get('/user/getuser', isAuthenticated, getUser)
router.get('/user/getalluser', verifyTokenAdmin, getAllUsers)
router.put('/user/update/:id',isAuthenticated, updateUser)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)

module.exports = router;