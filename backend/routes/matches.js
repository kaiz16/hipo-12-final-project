const express = require("express");
const router = express.Router();
const { Pets } = require("../Models/Pets.js");

const { verifyToken } = require("../functions/verifyToken");

router.get("/matches/:petId", verifyToken, async (req, res) => {
  const PET = await Pets.find({
    $and: [{ userId: { $eq: req.user._id } }, { _id: req.params.petId }],
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
  // remove duplicates
  let uniq = matches.filter(function({_id}) {
    return !this[_id] && (this[_id] = _id)
  }, {})
  res.json(uniq);
});

module.exports = router;
