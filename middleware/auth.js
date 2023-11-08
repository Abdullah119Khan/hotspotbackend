const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const secretKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA53VzmIVVZZWyNm266l82";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("Invalid Token")
  } 

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await UserModel.findById(decodedToken.id);
  next();
};

const verifyTokenAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json("You are not allowed to do that! Only admin can do this");
    }
  });
};

const verifyApiKey = (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (apiKey !== secretKey) {
    return res.status(401).json({ message: 'Unauthorized. Invalid API key.' });
  }
  next();
};

module.exports = {isAuthenticated, verifyApiKey, verifyTokenAdmin};