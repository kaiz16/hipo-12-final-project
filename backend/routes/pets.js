require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pets } = require("../Models/Pets.js");
const Personalities = require("../Models/Personalities.js");
const Types = require("../Models/Types.js");

const Matches = require("../Models/Matches.js");
const Meetups = require("../Models/Meetups.js");
const { verifyToken } = require("../functions/verifyToken");
const { filterPersonalities } = require("../functions/personalitiesFilter");
const { filterType } = require("../functions/typeFilter");
const { filterBreed } = require("../functions/breedFilter");

// Personalities
router.get("/personalities", verifyToken, async (req, res) => {
  let personalities = await Personalities.find({});
  res.json(personalities);
});

router.get("/types", verifyToken, async (req, res) => {
  let types = await Types.find({});
  res.json(types);
});
// ? makes the route parameter optional
router.get("/pets/:userId?", verifyToken, async (req, res) => {
  if (!req.params.userId) {
    let pets = await Pets.find({});
    return res.json(pets);
  } else {
    let pets = await Pets.find({ userId: req.params.userId });
    return res.json(pets);
  }
});

router.post("/pets/create", verifyToken, async (req, res) => {
  let { name, userId, city, personalities, type, breed, bio } = req.body;
  personalities = await filterPersonalities(personalities);
  type = await filterType(type);
  breed = await filterBreed(type, breed);
  const pet = new Pets({
    name,
    userId,
    city,
    personalities,
    type,
    breed,
    bio,
  });

  await pet.save();

  res.json(pet);
});

router.post("/pets/update/:petId", verifyToken, async (req, res) => {
  let { name, city, personalities, bio } = req.body;
  personalities = await filterPersonalities(personalities);
  type = await filterType(type);
  breed = await filterBreed(type, breed);
  const filter = { _id: req.params.petId, userId: req.user.id };
  const pet = await Pets.findOneAndUpdate(
    filter,
    {
      name,
      city,
      personalities,
      bio,
    },
    { new: true }
  );

  res.json(pet);
});

router.post("/pets/delete", verifyToken, async (req, res) => {
  let { id } = req.body;
  await Pets.findOneAndDelete({ _id: id });
  res.json("Ok");
});

router.get("/pets/potential_matches", verifyToken, async (req, res) => {
  let { petId } = req.body;
  // Get pet's personality model by id
  let petPersonality = await Personalities.find({ petId: petId });
  let personalities = [];

  // push only personality to an array
  petPersonality.forEach((element) => {
    personalities.push(element.personality);
  });

  // get matches per each personality
  // TODO ADD FILTER TO GROUP SAME IDS
  let petMatchesIds = [];
  for (let i = 0; i < personalities.length; i++) {
    let ids = await getIdByPersonality(personalities[i], petId);
    //comment out if statement if you want to push nulls on each personality
    if (ids.length != 0) petMatchesIds.push(ids);
  }
  res.json(petMatchesIds);
});

router.get("/pets/matches", verifyToken, async (req, res) => {
  let { petId } = req.body;

  let petMatchesIds = await Matches.find({
    petIdUser: petId,
  });

  res.json(petMatchesIds);
});

router.get("/pets/meetups", verifyToken, async (req, res) => {
  let { petId } = req.body;

  let petMeetups = await Meetups.find({
    petIdUser: petId,
  });

  res.json(petMeetups);
});

router.post("/create/personality", verifyToken, async (req, res) => {
  console.log(req.body);
  let { id, personality } = req.body;
  let newPersonality = new Personalities({
    petId: id,
    personality: personality,
  });

  await newPersonality.save();

  res.json(newPersonality);
});

router.post("/create/match", verifyToken, async (req, res) => {
  console.log(req.body);
  let { petId, matchId, personality } = req.body;
  let newMatch = new Matches({
    petIdUser: petId,
    petIdMatch: matchId,
    personalityType: personality,
  });

  await newMatch.save();

  res.json(newMatch);
});

router.post("/create/meetup", verifyToken, async (req, res) => {
  console.log(req.body);
  let { location, petId, petMatchId, matchId } = req.body;
  let newMeetup = new Meetups({
    location: location,
    petIdUser: petId,
    petIdMatch: matchId,
    personalityType: personality,
  });

  await newMeetup.save();

  res.json(newMeetup);
});

router.delete("/delete/personality", verifyToken, async (req, res) => {
  let { id } = req.body;
  await Personalities.findByIdAndDelete({ _id: id });
  res.json("Ok");
});

router.delete("/delete/match", verifyToken, async (req, res) => {
  let { id } = req.body;
  await Matches.findByIdAndDelete({ _id: id });
  res.json("Ok");
});

router.delete("/delete/meetup", verifyToken, async (req, res) => {
  let { id } = req.body;
  await Meetups.findByIdAndDelete({ _id: id });
  res.json("Ok");
});

async function getIdByPersonality(personality, petId) {
  console.log("personality", personality);
  let ids = await Personalities.find({
    $and: [{ petId: { $ne: petId } }, { personality: personality }],
  });
  console.log("ids", ids);
  return ids;
}

module.exports = router;
