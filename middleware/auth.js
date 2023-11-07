const jwt = require('jsonwebtoken');

const secretKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA53VzmIVVZZWyNm266l82";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    console.log("User role:", req.user);
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