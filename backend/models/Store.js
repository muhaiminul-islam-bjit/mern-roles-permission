const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Website",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Store", storeSchema);