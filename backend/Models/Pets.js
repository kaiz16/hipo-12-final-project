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
    data: Buffer,
    contentType: String,
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

const Pets = mongoose.model("pets", petSchema);
module.exports = { Pets, petSchema };
