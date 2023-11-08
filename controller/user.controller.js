const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
  const { firstName, lastName , email, confirmPassword, password, phone } = req.body;
  try {
    const user = await UserModel.findOne({ email })

    if(user) return res.status(409).json({message: "email already exists"})

    if(password != confirmPassword) return res.status(400).json("password not match");

    const hashPassword = bcrypt.hashSync(req.body.password, 12);

    const newUser = new UserModel({
      fullName: `${firstName} ${lastName}`, 
      email, 
      password: hashPassword, 
      mobile: phone,
    });

    const savedUser = await newUser.save()

    return res.status(201).json({ message: "User created successfully", user: savedUser})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if(!user) return res.status(404).json({ message: "user not found"})

    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    if(!matchPassword) return res.status(401).json({message: "password mismatch !!!!"})

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d"})

    const { password, ...other} = user._doc;
    return res.cookie("token", token, { httpOnly: true }).status(200).json({ success: true, message: "Login Successfully", user: other})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getUser = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.user.id);

    if(!getUser) return res.status(404).json("User Not Found")

    return res.status(200).json({ user: getUser})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const getAllUser = await UserModel.find();

    return res.status(200).json({ users: getAllUser })
  } catch(err) {
    return res.status(500).json(err)
  }
}

exports.updateUser = async (req, res) => {
  try {
    if(req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12)
    }
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    return res.status(200).json({ message: "User Updated Successfully", user: updateUser})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

    return res.status(204).json({ message: "User Deleted Successfully", user: deleteUser})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}