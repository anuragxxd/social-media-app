const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String,
    },
    userName: {
      required: true,
      trim: true,
      unique: true,
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error("password can't less than 6 letter.");
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("age must be greater than 0.");
        }
      },
    },
    caption: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length > 50) {
          throw new Error("caption must be less 50 words.");
        }
      },
    },
    posts: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    follower: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: Buffer,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
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

UserSchema.statics.findbyCreds = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
};

UserSchema.methods.createToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
