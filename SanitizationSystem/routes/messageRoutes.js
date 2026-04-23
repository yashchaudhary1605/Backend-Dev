const express = require("express");
const router = express.Router();

const { sendMessage } = require("../controllers/messageController");
const { sanitizeText } = require("../middleware/sanitize");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, sanitizeText, sendMessage);

module.exports = router;