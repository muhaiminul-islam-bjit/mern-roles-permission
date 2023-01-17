const mongoose = require("mongoose");

const webSiteSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  websiteName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Website", webSiteSchema);