// server.js

const express = require("express");
const jwt = require("jsonwebtoken");
const { saveOtp } = require("./otpService");
const mfaMiddleware = require("./mfamiddleware");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Generate random OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Login route → returns JWT + generates OTP
app.post("/login", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  // Create JWT
  const token = jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: "1h"
  });

  // Generate OTP
  const otp = generateOtp();

  // Save OTP
  saveOtp(userId, otp);

  // In real app → send via email/SMS
  console.log("OTP:", otp);

  res.json({
    message: "Login successful. OTP sent.",
    token
  });
});

// Protected route
app.post("/secure", mfaMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});