const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    by: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
