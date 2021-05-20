const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
    petIdUser: {
      type: String,
      required: true,
    },
    petIdMatch: {
      type: String,
      required: true
    },
    personalityType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("matches", matchesSchema);