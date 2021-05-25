const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupsSchema = new Schema({
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    petIdUser: {
      type: String,
      required: true,
    },
    petIdMatch: {
      type: String,
      required: true
    },
    matchId: {
        type: String,
        required: true
    }
});

/* 
    Sample
    {
        "type" : "Point",
        "coordinates" : [
            -122.5,
            37.7
        ]
    }
*/

module.exports = mongoose.model("meetups", meetupsSchema);