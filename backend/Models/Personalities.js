const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalitySchema = new Schema({
    personality: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
});

module.exports = mongoose.model("personalities", personalitySchema);