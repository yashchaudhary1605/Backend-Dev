// otpService.js

const otpStore = new Map(); // In-memory (use Redis/DB in production)

// Save OTP with expiry (5 minutes)
function saveOtp(userId, otp) {
  otpStore.set(userId, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });
}

// Get OTP
function getOtp(userId) {
  const data = otpStore.get(userId);

  if (!data) return null;

  // Check expiry
  if (Date.now() > data.expiresAt) {
    otpStore.delete(userId);
    return null;
  }

  return data.otp;
}

// Delete OTP after use
function deleteOtp(userId) {
  otpStore.delete(userId);
}

module.exports = { saveOtp, getOtp, deleteOtp };