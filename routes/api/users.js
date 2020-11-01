const express = require('express');
const { check } = require('express-validator');

const users = require('../../controllers/users');

const router = express.Router();

router.post(
	'/',
	[
		check('name').notEmpty({ ignore_whitespace: true }),
		check('email').isEmail(),
		check('password').isLength({ min: 6 })
	],
	users.signup
);

module.exports = router;
