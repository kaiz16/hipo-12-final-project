const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { petSchema } = require('./Pets.js')

const favouritePets = new Schema({
    pet: petSchema,
    user_id: {
      type: String,
      required: true
    },
});

module.exports = mongoose.model("favourites", favouritePets);