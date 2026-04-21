const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // Activity fields
  loginAt: {
    type: Date
  },
  logoutAt: {
    type: Date
  },
  lastActiveAt: {
    type: Date
  }
}, { timestamps: true });

/**
 * Middleware: runs before saving user
 * Updates lastActiveAt automatically
 */
userSchema.pre("save", function (next) {
  this.lastActiveAt = new Date();
  next();
});

/**
 * Middleware: runs before update queries
 * (important for findOneAndUpdate, updateOne, etc.)
 */
userSchema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  this.set({ lastActiveAt: new Date() });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;