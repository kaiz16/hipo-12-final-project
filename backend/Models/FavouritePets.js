const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouritePets = new Schema({
    petId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
});

module.exports = mongoose.model("favourites", favouritePets);