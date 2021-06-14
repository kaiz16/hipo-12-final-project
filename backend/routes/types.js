const express = require("express");
const router = express.Router();
const Types = require("../Models/Types");
// register users
router.post("/create-types", async (req, res) => {
  let types = [
    {
      type: "Dog",
      breeds: [
          "German Shephard", 
          "Bulldog",
          "Labrador Retriever",
          "Poodle",
          "Golden Retriever",
          "Dachshund",
          "Chihuahua",
          "French Bulldog",
          "Siberian Husky",
          "Pomeranian",
          "Great Dane",
          "Rottweiler",
          "Greyhound",
          "Bernese Mountain"
        ],
    },
    {
      type: "Cat",
      breeds: [
        "Persian",
        "British Shorthair",
        "Maine Coon",
        "Siamese",
        "Ragdoll",
        "Bengal",
        "American Shorthair",
        "Sphynx",
        "Abyssinian",
        "Exotic Shorthair",
        "Scottish Fold",
        "Norwegian Forest",
        "Burmese",
        "Munchkin"
      ],
    },
  ];

  types.forEach(async (type) => {
    let d = new Types({
      type: type.type,
      breeds: type.breeds,
    });
    await d.save();
  });
  res.json("ok");
});

module.exports = router;
