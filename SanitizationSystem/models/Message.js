const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String
});

module.exports = mongoose.model("Message", messageSchema);