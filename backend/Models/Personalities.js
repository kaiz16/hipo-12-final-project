const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalitySchema = new Schema({
  personality: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("personalities", personalitySchema);
