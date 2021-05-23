require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/User.js");
const Personalities = require("../Models/Personalities.js")
const {getSimilarPersonalities} = require("../functions/PersonalityMatching.js")
const { ensureAuthenticated } = require("./auth.js");

router.get("/userId", ensureAuthenticated, async (req, res) => {
    let user = await User.find({});
    res.json(user);
});

module.exports = router;
