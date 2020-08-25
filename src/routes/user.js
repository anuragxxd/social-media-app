const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Post = require("../models/post");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail } = require("../emails/account");
const jwt = require("jsonwebtoken");

router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.createToken();
    sendWelcomeEmail(user.email, user.name, token);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/verify/:token", async (req, res) => {
  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  user.verified = true;
  await user.save();
  res.cookie("token", req.params.token, {
    // maxAge: 60 * 60 * 1000,
    httpOnly: true,
    // secure: true,
    // sameSite: true,
  });
  res.send(user);
});

router.get("/api/users/:userName", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findbyCreds(req.body.email, req.body.password);
    const token = await user.createToken();
    res.cookie("token", token, {
      // maxAge: 60 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      // sameSite: true,
    });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    res.clearCookie("token");
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send("not working");
  }
});

router.delete("/api/users", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/api/users", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "userName", "password", "caption", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(400).send("invalid data!!");
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/users/find/:query", auth, async (req, res) => {
  try {
    const users = await User.find({
      userName: { $regex: req.params.query, $options: "i" },
    });
    const userNames = await users.map((user) => {
      return user.userName;
    });
    res.send(userNames);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
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
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send(req.user);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
