const mongoose = require("mongoose");
const newCampaignSchema = mongoose.Schema({
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
        require: true
      }
    }
  ]
});

// newCampaignSchema.statics.addNew = async (_id, name) => {
//   const list = await NewCampaign.findOne({ _id });
//   list.item = list.item.concat({ name });
//   await list.save();
//   return list;
// }

// newCampaignSchema.statics.delOne = async (_id, name) => {
//   const list = await NewCampaign.findOne({ _id });
//   await list.save();
//   return list;
// }

const NewCampaign = mongoose.model("newCampaign", newCampaignSchema);
module.exports = NewCampaign;