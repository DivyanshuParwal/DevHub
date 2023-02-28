const bcrypt = require("bcryptjs");
// const config = require('config');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/Http-error");
const User = require("../models/User");

const authUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    res.json({ user: foundUser });
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 400)
    );
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (!isMatch)
        return next(new HttpError("Incorrect Password entered", 400));

      const payload = {
        user: {
          id: existingUser.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) return next(new HttpError(err.message, 500));
          return res.json({ token, expiresIn: 3600 });
        }
      );
    }
    return next(new HttpError("User not found.Please Sign up", 400));
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

exports.user = authUser;
exports.login = login;
