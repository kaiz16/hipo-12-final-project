const express = require("express");
const router = express.Router();
const FavouritePets = require("../Models/FavouritePets.js");
const { Pets } = require("../Models/Pets.js");
const { verifyToken } = require("../functions/verifyToken");
// ? makes the route parameter optional
router.get("/favourites", verifyToken, async (req, res) => {
  let favourites = await FavouritePets.find({
    user_id: req.user.id,
  });
  res.json(favourites);
});

router.get("/favourites/:petId", verifyToken, async (req, res) => {
  let favourite = await FavouritePets.find({
    user_id: req.user.id,
    "pet._id": req.params.petId,
  });
  res.json(favourite);
});
// ? makes the route parameter optional
router.post("/favourites/create", verifyToken, async (req, res) => {
  let { petId } = req.body;
  let pet = await Pets.find({ _id: petId });
  if (!pet[0]) {
    return res.status(400).json("Pet with that id doesn't exist");
  }
  let favourite = new FavouritePets({
    pet: pet[0],
    user_id: req.user._id,
  });
  await favourite.save();
  res.json(favourite);
});

router.post("/favourites/delete", verifyToken, async (req, res) => {
  let { id } = req.body;
  await FavouritePets.findOneAndDelete({ _id: id });
  res.json("Ok");
});

module.exports = router;
