const express = require('express');
const auth = require('../../middleware/auth');
const HttpError = require('../../models/Http-error');
const profile = require('../../controllers/profile');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', profile.getProfiles);

router.get('/profile/:user_id', profile.getProfileByUserId);

router.get('/user/profile', auth, profile.getProfile);

router.get('/user/github/:username', profile.getGithubProfileByUsername);

router.post(
	'/user/profile',
	[ auth, [ check('status').notEmpty(), check('skills').notEmpty() ] ],
	profile.createProfile
);

router.put(
	'/user/profile/experience',
	[
		auth,
		[
			check('title').not().isEmpty(),
			check('company').not().isEmpty(),
			check('from').not().isEmpty().custom((value, { req }) => (req.body.to ? value < req.body.to : true))
		]
	],
	profile.addProfileExperience
);

router.put(
	'/user/profile/education',
	[
		auth,
		[
			check('school').not().isEmpty(),
			check('degree').not().isEmpty(),
			check('fieldofstudy').not().isEmpty(),
			check('from').not().isEmpty().custom((value, { req }) => (req.body.to ? value < req.body.to : true))
		]
	],
	profile.addProfileEducation
);

router.delete('/user/profile', auth, profile.deleteProfile);

router.delete('/user/profile/experience/:experience_id', auth, profile.deleteProfileExperience);

router.delete('/user/profile/education/:education_id', auth, profile.deleteProfileEducation);

module.exports = router;
