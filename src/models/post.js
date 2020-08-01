const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: Buffer,
    },
    likes: [
      {
        userName: {
          type: String,
          required: true,
        },
      },
    ],
    comment: [
      {
        userName: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
