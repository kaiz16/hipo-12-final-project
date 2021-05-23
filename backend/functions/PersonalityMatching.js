const mongoose = require("mongoose");
const personalities = require('../Models/Personalities')
const matches = require('../Models/Matches')

module.exports = async function getSimilarPersonalities(petPersonality) {
    const petPersonalities = await personalities.find({});
    for (var personality of petPersonalities) {
        if (petPersonality == personality) {
            var newMatch = new matches({ petIdUser: petPersonality.petId, petIdMatch:personality.petId, personalityType:personality});
            newMatch.save(function (err) {
                if (err) {
                    console.log(err)
                };
                // saved!
            });
        }

    }
}