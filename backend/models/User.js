const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Website",
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Store",
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
