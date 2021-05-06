require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pets = require("../Models/Pets.js");
// const { ensureAuthenticated } = require("./auth.js");

router.get("/pets", async (req, res) => {
  const pets = await Pets.find({});
  res.json(pets);
});

router.post("/create", async (req, res) => {
  let { name, userId } = req.body;
  let pet = new Pets({
    name: name,
    userId: userId,
  });

  await pet.save();

  res.json(pet);
});

router.delete("/delete", async (req, res) => {
  let { id } = req.body;
  await Pets.findByIdAndDelete({ _id: id });
  res.json("Ok");
});

module.exports = router;
