// mfaMiddleware.js

const jwt = require("jsonwebtoken");
const { getOtp, deleteOtp } = require("./otpService");

const SECRET_KEY = "mysecretkey";

const mfaMiddleware = (req, res, next) => {
  try {
    // 1. Get token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // 3. Get OTP
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "OTP required" });
    }

    // 4. Validate OTP
    const storedOtp = getOtp(decoded.id);

    if (!storedOtp) {
      return res.status(403).json({ message: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    // 5. Delete OTP after success
    deleteOtp(decoded.id);

    // 6. Attach user
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = mfaMiddleware;