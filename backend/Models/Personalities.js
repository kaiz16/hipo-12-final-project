const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const personalitySchema = new Schema({
//     personality: {
//       type: String,
//       required: true,
//     },
//     petId: {
//       type: String,
//       required: true
//     },
// });
// module.exports = mongoose.model("personalities", personalitySchema);

const personalitySchema = new Schema({
  personality: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("personalities", personalitySchema);
