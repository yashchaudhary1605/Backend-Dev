const express = require("express");
const validator = require("validator");
const Review = require("../models/Review");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  let { comment } = req.body;

  comment = validator.escape(comment);

  const review = new Review({
    user: req.session.user._id,
    comment
  });

  await review.save();
  res.json({ message: "Review added safely" });
});

module.exports = router;