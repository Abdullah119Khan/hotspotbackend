const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
  const { firstName, lastName , email, confirmPassword, password, phone } = req.body;
  try {
    const user = await UserModel.findOne({ email })

    if(user) return res.status(409).json("email already exists")

    if(password != confirmPassword) return res.status(400).json("password not match");

    const hashPassword = bcrypt.hashSync(password, 10);

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

    if(!user) return res.status(404).json("user not found")

    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    if(!matchPassword) return res.status(401).json("password mismatch!!!!")

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d"})

    const { password, ...other} = user._doc;
    return res.status(200).json({ success: true, message: "Login Successfully", token, user: other})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}