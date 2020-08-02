const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Friend = require("../models/friend");

router.post("/api/:userName/sendReq", auth, async (req, res) => {
  try {
    const temp = await Friend.findOne({
      requestedTo: req.params.userName,
      requestedBy: req.user.userName,
    });

    if (!temp) {
      const friend = new Friend({
        requestedTo: req.params.userName,
        requestedBy: req.user.userName,
        status: 0,
      });
      await friend.save();
    } else {
      await Friend.deleteOne({
        requestedTo: req.params.userName,
        requestedBy: req.user.userName,
      });
      const user1 = await User.findOne({ userName: req.params.userName });
      user1.follower = user1.follower - 1;
      await user1.save();
      const user2 = await User.findOne({ userName: req.user.userName });
      user2.following = user2.following - 1;
      await user2.save();
    }

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/req", auth, async (req, res) => {
  try {
    const requests = await Friend.find({
      requestedTo: req.user.userName,
      status: 0,
    });
    res.send(requests);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/req/:userName", auth, async (req, res) => {
  try {
    const request = await Friend.findOne({
      requestedBy: req.params.userName,
      requestedTo: req.user.userName,
    });
    request.status = 1;
    await request.save();
    if (request) {
      const user1 = await User.findById(req.user._id);
      user1.follower = user1.follower + 1;
      await user1.save();
      const user2 = await User.findOne({ userName: req.params.userName });
      user2.following = user2.following + 1;
      await user2.save();
    }

    const requests = await Friend.find({
      requestedTo: req.user.userName,
      status: 0,
    });
    res.send(requests);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/req/:userName/status", auth, async (req, res) => {
  try {
    const request = await Friend.findOne({
      requestedTo: req.params.userName,
      requestedBy: req.user.userName,
    });
    if (!request) {
      res.send("Follow");
    } else if (request.status == 0) {
      res.send("Requested");
    } else {
      res.send("Following");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/:userName/followers", auth, async (req, res) => {
  try {
    const followers = await Friend.find({
      requestedTo: req.params.userName,
      status: 1,
    });
    const userNames = await followers.map((follower) => {
      return follower.requestedBy;
    });
    res.send(userNames);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/:userName/following", auth, async (req, res) => {
  try {
    const following = await Friend.find({
      requestedBy: req.params.userName,
      status: 1,
    });
    const userNames = await following.map((follow) => {
      return follow.requestedTo;
    });
    res.send(userNames);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
