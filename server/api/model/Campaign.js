const mongoose = require("mongoose");
const CampaignSchema = mongoose.Schema({
  admin: [{
    email: {
      type: String,
      required: true
    }
  }],
  org: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  camDesc: {
    type: String,
    required: true
  },
  orgDesc: {
    type: String,
    required: true
  },
  collectionAddress: {
    type: String,
    required: true
  },
  collectionContact: {
    type: String,
    required: true
  },
  collectionDate: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: String,
        required: true
      },
      qty: {
        type: String,
        required: true
      }
    }
  ],
  publish: {
    type: Boolean,
    required: true
  },
});

const Campaign = mongoose.model("campaign", CampaignSchema);
module.exports = Campaign;