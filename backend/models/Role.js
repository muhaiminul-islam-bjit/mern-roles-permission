const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        unique: true
    },
    permissions: [
        {
            type: String
        }
    ],
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Website",
    },


});

module.exports = mongoose.model("Role", RoleSchema);