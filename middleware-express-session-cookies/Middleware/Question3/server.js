const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");

const app = express();
app.use(express.json());

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/activityDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/**
 * LOGIN → updates loginAt + lastActiveAt
 */
app.post("/login", async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.loginAt = new Date();
  user.lastActiveAt = new Date();

  await user.save();

  res.json({ message: "Login recorded", user });
});

/**
 * LOGOUT → updates logoutAt
 */
app.post("/logout", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    {
      logoutAt: new Date()
    },
    { new: true }
  );

  res.json({ message: "Logout recorded", user });
});

/**
 * ANY ACTIVITY → updates lastActiveAt automatically via middleware
 */
app.put("/update-profile", async (req, res) => {
  const { email, newEmail } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { email: newEmail },
    { new: true }
  );

  res.json({ message: "Profile updated", user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});