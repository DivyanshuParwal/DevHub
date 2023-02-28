const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require('config');
const normalize = require("normalize-url");
require("dotenv").config();

const User = require("../models/User");
const HttpError = require("../models/Http-error");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 400)
    );
  }

  req.body.avatar = normalize(
    gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    }),
    { forceHttps: true }
  );

  const salt = await bcrypt.genSalt(10);

  req.body.password = await bcrypt.hash(req.body.password, salt);

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const registeredUser = await User.create(req.body);
      const payload = {
        user: {
          id: registeredUser.id,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) return next(new HttpError(err.message, 500));
          res.json({ token, expiresIn: 3600 });
        }
      );
    } else {
      return next(
        new HttpError("User already exists with the given email address", 400)
      );
    }
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

exports.signup = signup;
