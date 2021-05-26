const express = require("express");
const router = express.Router();
const Pets = require("../Models/Pets.js");

const { ensureAuthenticated } = require("./auth.js");

router.get("/matches", ensureAuthenticated, async (req, res) => {
  // find all pets by user
  const USER_PETS = await Pets.find({ userId: req.user.id });
  let matches = [];
  // console.log(USER_PETS)
  // for each user pets
  for (let i = 0; i < USER_PETS.length; i++) {
    let personalities = USER_PETS[i].personalities;

    for (let x = 0; x < personalities.length; x++) {
      let personality = personalities[x];
      const PETS_BY_PERSONALITY = await Pets.find({
        $and: [
          { userId: { $ne: req.user.id } },
          { personalities: personality },
        ],
      });
      matches = [...matches, ...PETS_BY_PERSONALITY];
    }
  }

  res.json(matches);
});

router.get("/matches/:petId", ensureAuthenticated, async (req, res) => {
  const PET = await Pets.find({
    $and: [{ userId: { $eq: req.user.id } }, { _id: req.params.petId }],
  });
  let matches = [];
  let personalities = PET[0].personalities;

  for (let x = 0; x < personalities.length; x++) {
    let personality = personalities[x];
    // Find pets with this personality
    const PETS_BY_PERSONALITY = await Pets.find({
      $and: [{ userId: { $ne: req.user.id } }, { personalities: personality }],
      // $and: [{ personalities: personality }],
    });
    matches = [...matches, ...PETS_BY_PERSONALITY];
  }

  res.json(matches);
});

module.exports = router;
