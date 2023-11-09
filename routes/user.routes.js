const express = require('express');
const { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser, getUserById } = require('../controller/user.controller');
const { isAuthenticated, verifyTokenAdmin, verifyUserAndAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const router = express.Router()

router.post('/user/create', verifyTokenAdmin, createUser)
router.post('/user/login', loginUser)
router.get('/user/getuser', isAuthenticated, getUser)
router.get('/user/getalluser', isAuthenticated, getAllUsers)
router.put('/user/update/:id',verifyUserAndAdmin, upload.single('avatar'), updateUser)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)
router.get('/user/getById/:id', verifyTokenAdmin, getUserById)


module.exports = router;