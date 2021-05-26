const express = require("express");
const router = express.Router();
const FavouritePets = require("../Models/FavouritePets.js");
const { ensureAuthenticated } = require("./auth.js");
// ? makes the route parameter optional
router.get("/favourites", ensureAuthenticated, async (req, res) => {
  let favourites = await FavouritePets.find({
    userId: req.user.id,
  });
  res.json(favourites);
});

router.get("/favourites/:petId", ensureAuthenticated, async (req, res) => {
  let favourite = await FavouritePets.find({
    userId: req.user.id,
    petId: req.params.petId,
  });
  res.json(favourite);
});
// ? makes the route parameter optional
router.post("/favourites/create", ensureAuthenticated, async (req, res) => {
  let { petId } = req.body;
  let favourite = new FavouritePets({
    petId,
    userId: req.user.id,
  });
  await favourite.save();
  res.json(favourite);
});

router.post("/favourites/delete", ensureAuthenticated, async (req, res) => {
  let { id } = req.body;
  await FavouritePets.findOneAndDelete({ _id: id });
  res.json("Ok");
});

module.exports = router;
