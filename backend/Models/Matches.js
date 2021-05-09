const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
    userId1: {
      type: String,
      required: true,
    },
    userId2: {
      type: String,
      required: true
    },
    personalityId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("matches", matchesSchema);