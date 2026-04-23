const express = require("express");
const router = express.Router();

const { register, login, verifyMFA } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/verify-mfa", verifyMFA);

module.exports = router;