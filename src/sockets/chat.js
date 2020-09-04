const Message = require("../models/message.js");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports = module.exports = async (io) => {
  io.on("connection", async (socket) => {
    try {
      if (!socket.handshake.headers.cookie) {
        throw new Error();
      }
      var cookiearray = socket.handshake.headers.cookie.split("; ");
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
      console.log(user.userName);
      socket.join(user.userName);
      socket.on("SendingMessage", async (SendingObject) => {
        const message = new Message({ by: user.userName, ...SendingObject });
        await message.save();
        socket.to(SendingObject.to).emit("ReceivingObject", message);
      });
    } catch (e) {
      console.log(e);
    }
  });
};
