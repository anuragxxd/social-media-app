const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    var cookiearray = req.header("Cookie").split("; ");
    var token;
    for (var i = 0; i < cookiearray.length; i++) {
      name = cookiearray[i].split("=")[0];
      value = cookiearray[i].split("=")[1];
      if (name == "token") {
        token = value;
      }
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = auth;
