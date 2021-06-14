const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  type: {
    type: String,
    unique: true,
  },
  breeds: [String],
});

module.exports = mongoose.model("Types", typeSchema);
