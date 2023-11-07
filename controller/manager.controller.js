const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.createManager = async (req, res) => {
  const { firstName, lastName , email, password, confirmPassword, phone } = req.body;
  try {
    const manager = await UserModel.findOne({ email })

    if(manager) return res.status(409).json("email already exists")

    if(password != confirmPassword) return res.status(400).json("password not match");

    const hashPassword = bcrypt.hashSync(password, 10);

    const newManager = new UserModel({
      fullName: `${firstName} ${lastName}`, 
      email, 
      password: hashPassword, 
      mobile: phone,
      role: 'manager'
    });

    const savedManager = await newManager.save()

    return res.status(201).json({ message: "Manager created successfully", manager: savedManager})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.loginManager = async (req, res) => {
  try {
    const manager = await UserModel.findOne({email: req.body.email});

    if(!manager) return res.status(404).json("Manager not found")

    const matchPassword = bcrypt.compareSync(req.body.password, manager.password);

    if(!matchPassword) return res.status(401).json("password mismatch!!!!")

    const token = jwt.sign({ id: manager._id, email: manager.email, role: manager.role}, process.env.JWT_SECRET, { expiresIn: "30d"})

    const { password, ...other} = manager._doc;
    return res.json({ success: true, message: "Login Successfully", token, manager: other})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}