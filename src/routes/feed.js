const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Friend = require("../models/friend");
const Post = require("../models/post");

router.get("/api/feed", auth, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const following = await Friend.find({
    requestedBy: req.user.userName,
    status: 1,
  });
  const userNames = await following.map((follow) => {
    return follow.requestedTo;
  });
  const posts = await Post.find({ owner: { $in: userNames } })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec();
  res.send(posts);
});

module.exports = router;
