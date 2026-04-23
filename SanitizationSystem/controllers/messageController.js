const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const msg = await Message.create({
    senderId: req.session.user._id,
    receiverId: req.body.receiverId,
    text: req.body.text
  });

  res.json(msg);
};