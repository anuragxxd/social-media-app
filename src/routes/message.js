const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Friend = require("../models/friend");
const Message = require("../models/message");

router.get("/api/message/:userName", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { to: req.user.userName, by: req.params.userName },
        { by: req.user.userName, to: req.params.userName },
      ],
    }).sort({ _id: -1 });
    res.send(messages);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/messageList/friends", auth, async (req, res) => {
  try {
    const following = await Friend.find({
      requestedBy: req.user.userName,
      status: 1,
    });

    const userNames = await following.map((follow) => {
      return follow.requestedTo;
    });

    const messages = await Message.find({
      $or: [
        { by: req.user.userName, to: { $in: userNames } },
        { by: { $in: userNames }, to: req.user.userName },
      ],
    }).sort({ _id: -1 });

    const users = await messages.map((message) => {
      return message.to == req.user.userName ? message.by : message.to;
    });

    var unique = users.filter((v, i, a) => a.indexOf(v) === i);

    res.send(unique);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/messageList/requests", auth, async (req, res) => {
  try {
    const following = await Friend.find({
      requestedBy: req.user.userName,
      status: 1,
    });

    const userNames = await following.map((follow) => {
      return follow.requestedTo;
    });

    const messages = await Message.find({
      $or: [
        { by: req.user.userName, to: { $nin: userNames } },
        { by: { $nin: userNames }, to: req.user.userName },
      ],
    }).sort({ _id: -1 });

    const users = await messages.map((message) => {
      return message.to == req.user.userName ? message.by : message.to;
    });

    var unique = users.filter((v, i, a) => a.indexOf(v) === i);

    res.send(unique);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
