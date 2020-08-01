const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Post = require("../models/post");
const User = require("../models/user");
ObjectId = require("mongodb").ObjectID;

router.post("/api/post", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const post = new Post({
    ...req.body,
    owner: user.userName,
  });
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (e) {
    res.send(400).send(e);
  }
});

router.get("/api/posts/:userName", async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.params.userName });
    var filter = posts.filter((post) => {
      return Buffer.isBuffer(post.image);
    });
    res.send(filter);
  } catch (e) {
    res.send(400).send(e);
  }
});

router.get("/api/myPosts", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const posts = await Post.find({ owner: user.userName });
  var filter = posts.filter((post) => {
    return Buffer.isBuffer(post.image);
  });
  res.send(filter);
});

const upload = multer({
  limits: {
    // fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (
      !(
        file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".png")
      )
    ) {
      return cb(new Error("Provide an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/api/post/:id/image",
  auth,
  upload.single("postImage"),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    const post = await Post.findOne({
      _id: req.params.id,
      owner: user.userName,
    });
    const image = await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .png()
      .toBuffer();
    post.image = image;
    await post.save();
    user.posts = user.posts + 1;
    await user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post("/api/post/:id/like", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findOne({ _id: req.params.id });
    var liked = false;
    for (let like of post.likes) {
      if (like.userName == user.userName) {
        liked = true;
        break;
      }
    }
    if (!liked) {
      post.likes.push({ userName: user.userName });
    } else {
      var newLikes = post.likes.filter((like) => {
        return like.userName !== user.userName;
      });
      post.likes = newLikes;
    }

    post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/post/:id/comment", auth, async (req, res) => {
  try {
    if (req.body.body === "") {
      res.status(400).send();
    }
    const user = await User.findById(req.user._id);
    const post = await Post.findOne({ _id: req.params.id });
    post.comment.push({ userName: user.userName, body: req.body.body });
    post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/post/:id/comment/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    var newComments = post.comment.filter((comment) => {
      return comment._id != req.params.commentId;
    });
    post.comment = newComments;
    post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/post/:id/likes", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post.likes);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
