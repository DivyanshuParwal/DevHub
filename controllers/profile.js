const { validationResult } = require("express-validator");
// const config = require('config');
const axios = require("axios");
const normalize = require("normalize-url");
require("dotenv").config();

const Profile = require("../models/Profile");
const HttpError = require("../models/Http-error");
const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!foundProfile) {
      return next(
        new HttpError("There is no profile of the current user", 400)
      );
    }
    res.json(foundProfile);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const createProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 400)
    );
  }
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  const profileFields = {
    user: req.user.id,
    company,
    location,
    website:
      website && website !== "" ? normalize(website, { forceHttps: true }) : "",
    bio,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => skill.trim()),
    status,
    githubusername,
  };

  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  for (let key in socialFields) {
    if (socialFields[key])
      socialFields[key] = normalize(socialFields[key], { forceHttps: true });
  }

  profileFields.social = socialFields;

  try {
    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(profile);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return next(new HttpError("Profile not found", 400));
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId")
      return next(new HttpError("Profile not found", 400));
    next(new HttpError(err.message, 500));
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const addProfileExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 400)
    );
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.push(newExp);

    await profile.save();
    res.json(profile);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const addProfileEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed. Please check your data", 400)
    );
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.push(newEdu);

    await profile.save();
    res.json(profile);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const deleteProfileExperience = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.experience_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const deleteProfileEducation = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.education_id
    );

    await profile.save();
    res.json(profile);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

const getGithubProfileByUsername = async (req, res, next) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${process.env.githubToken}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    next(new HttpError(err.message, 500));
  }
};

exports.getProfile = getProfile;
exports.createProfile = createProfile;
exports.getProfiles = getProfiles;
exports.getProfileByUserId = getProfileByUserId;
exports.deleteProfile = deleteProfile;
exports.addProfileExperience = addProfileExperience;
exports.deleteProfileExperience = deleteProfileExperience;
exports.addProfileEducation = addProfileEducation;
exports.deleteProfileEducation = deleteProfileEducation;
exports.getGithubProfileByUsername = getGithubProfileByUsername;
