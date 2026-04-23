const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    userId: req.session.user._id,
    content: req.body.content
  });

  res.json(post);
};