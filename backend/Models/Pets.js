const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  city: {
    type: String,
  },
  type: {
    type: String,
  },
  breed: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  personalities: {
    type: Array,
    default: () => [],
  },
});

module.exports = mongoose.model("pets", petSchema);
