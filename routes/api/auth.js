const express = require('express');
const { check } = require('express-validator');

const auth = require('../../middleware/auth');
const authUser = require('../../controllers/auth');

const router = express.Router();

router.get('/', auth, authUser.user);

router.post('/', [ check('email').isEmail(), check('password').isLength({ min: 6 }) ], authUser.login);

module.exports = router;
