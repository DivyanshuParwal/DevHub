const jwt = require("jsonwebtoken");
// const config = require('config');
require("dotenv").config();

const HttpError = require("../models/Http-error");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return next(new HttpError("Access Denied", 401));
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.jwtSecret);

    req.user = decodedPayload.user;
    next();
  } catch (err) {
    next(new HttpError("Invalid Token", 401));
  }
};
