const express = require('express');
const { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser, getUserById, logout } = require('../controller/user.controller');
const { isAuthenticated, verifyTokenAdmin, verifyUserAndAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const router = express.Router()

router.post('/user/create', createUser)
router.post('/user/login', loginUser)
router.get('/user/getuser', isAuthenticated, getUser)
router.get('/user/getalluser', isAuthenticated, getAllUsers)
router.put('/user/update/:id',verifyUserAndAdmin, upload.single('avatar'), updateUser)
router.delete('/user/delete/:id', verifyTokenAdmin, deleteUser)
router.get('/user/getById/:id', verifyUserAndAdmin, getUserById)
router.get('/user/logout', logout)


module.exports = router;