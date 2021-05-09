const mongoose = require("mongoose");
const personalities = require('../Models/Personalities')
const matches = require('../Models/Matches')

export async function getSimilarPersonalities(petPersonality) {
    const petPersonalities = await personalities.find({});
    for (var personality of petPersonalities) {
        if (petPersonality == personality) {
            var newMatch = new matches({ userId1: petPersonality.userId, userId2:personality.userId,personalityId:personality});
            newMatch.save(function (err) {
                if (err) {
                    console.log(err)
                };
                // saved!
            });
        }

    }
}

