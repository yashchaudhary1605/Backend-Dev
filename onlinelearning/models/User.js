const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student"
  },
  mfaCode: String
});

module.exports = mongoose.model("User", userSchema);