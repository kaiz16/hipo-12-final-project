const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const { ensureAuthenticated } = require("./auth.js");

router.get("/users", ensureAuthenticated, async (req, res) => {
  let users = await User.find({});
  res.json(users);
});

router.get("/me", ensureAuthenticated, function (req, res) {
  res.json(req.user);
});

router.post("/me", ensureAuthenticated, async (req, res) => {
  let { name } = req.body;
  const filter = { _id: req.user.id };
  const me = await Pets.findOneAndUpdate(
    filter,
    {
      name,
    },
    { new: true }
  );

  res.json(me);
});

module.exports = router;
