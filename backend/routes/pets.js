require("dotenv").config();
const express = require("express");
const router = express.Router();
const Pets = require("../Models/Pets.js");
const Personalities = require("../Models/Personalities.js")
const { ensureAuthenticated } = require("./auth.js");
var pets = null;
var petMatchesIds = []

router.get("/pets", ensureAuthenticated, async (req, res) => {
  pets = await Pets.find({});
  res.json(pets);
});

router.get("/personalities", ensureAuthenticated, async (req, res) => {
  pets = await Personalities.find({});
  res.json(pets);
});

router.get("/pets/matches", ensureAuthenticated, async (req, res) => {

  let { petId } = req.body;
  // Get pet's personality model by id 
  let petPersonality = await Personalities.find({ petId : petId})
  let personalities = [];

  // push only personality to an array
  petPersonality.forEach(element =>{
    personalities.push(element.personality)
  })

  // get matches per each personality
  // TODO ADD FILTER TO GROUP SAME IDS
  for(let i = 0; i < personalities.length; i++){
    let ids = await getIdByPersonality(personalities[i], petId)
    //comment out if statement if you want to push nulls on each personality
    if(ids.length != 0) petMatchesIds.push(ids)
  }
  res.json(petMatchesIds);
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  let { name, userId } = req.body;
  let pet = new Pets({
    name: name,
    userId: userId,
  });

  await pet.save();

  res.json(pet);
});

router.post("/pets/personality", ensureAuthenticated, async (req, res) => {
  console.log(req.body)
  let { id, personality } = req.body;
  let newPersonality = new Personalities({
    petId: id,
    personality: personality,
  });

  await newPersonality.save();

  res.json(newPersonality);
});

router.delete("/delete", ensureAuthenticated, async (req, res) => {
  let { id } = req.body;
  await Pets.findByIdAndDelete({ _id: id });
  res.json("Ok");
});

async function getIdByPersonality(personality, petId){
  console.log("personality",personality)
  let ids = await Personalities.find(
    {
      $and: [
          {petId : {$ne : petId}},
          {personality : personality}
      ] 
    })
  console.log("ids", ids)
  return ids;
}

module.exports = router;
