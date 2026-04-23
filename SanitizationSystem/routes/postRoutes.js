const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/postController");
const { postValidation } = require("../validators/postValidator");
const validate = require("../middleware/validate");
const { sanitizePost } = require("../middleware/sanitize");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, postValidation, validate, sanitizePost, createPost);

module.exports = router;