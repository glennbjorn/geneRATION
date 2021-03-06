const mongoose = require("mongoose");
const donorSchema = mongoose.Schema({
  campaignid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Please include your name"]
  },
  contact: {
    type: String,
    required: [true, "Please include your organisation"]
  },
  address: {
    type: String,
    required: [true, "Please include your email"]
  },
  unit: {
    type: String,
    required: [true, "Please include your password"]
  },
  items: [
    {
      item: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      donate: {
        type: Boolean,
        required: true
      }
    },
  ],
  remarks: {
    type: String
  },
  dropoff: {
    type: Boolean,
    required: true
  },
  collected: {
    type: Boolean,
    required: true
  }
});

const Donor = mongoose.model("donations", donorSchema);
module.exports = Donor;