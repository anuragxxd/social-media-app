const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
  {
    requestedTo: {
      type: String,
      required: true,
    },
    requestedBy: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
