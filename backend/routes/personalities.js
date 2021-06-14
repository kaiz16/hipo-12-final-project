const express = require("express");
const router = express.Router();
const Personalities = require("../Models/Personalities");
// register users
router.post("/create-personalities", async (req, res) => {
  let personalities = [
    "Perceptive",
    "Supportive",
    "Optimistic",
    "Enthusiastic",
    "Creative",
    "Engaging",
    "Mysterious",
    "Clever",
    "Curious",
    "Quick",
  ];

  personalities.forEach(async (personality) => {
    let d = new Personalities({
      personality,
    });
    await d.save();
  });
});

module.exports = router;
