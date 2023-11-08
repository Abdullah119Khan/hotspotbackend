const express = require('express');
const { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controller/user.controller');
const { isAuthenticated, verifyTokenAdmin, verifyUserAndAdmin } = require('../middleware/auth');
const router = express.Router()

router.post('/user/create', verifyTokenAdmin, createUser)
router.post('/user/login', loginUser);
router.get('/user/getuser', isAuthenticated, getUser)
router.get('/user/getalluser', verifyTokenAdmin, getAllUsers)
router.put('/user/update/:id',verifyUserAndAdmin, updateUser)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)

module.exports = router;