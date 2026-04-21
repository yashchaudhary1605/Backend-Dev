const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");

const app = express();
app.use(express.json());

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/softDeleteDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/**
 * Create User
 */
app.post("/user", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

/**
 * Get all users (deleted automatically excluded)
 */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/**
 * Soft delete user
 */
app.delete("/user/:id", async (req, res) => {
  const user = await User.softDeleteById(req.params.id);
  res.json({ message: "User soft deleted", user });
});

/**
 * Restore user
 */
app.put("/restore/:id", async (req, res) => {
  const user = await User.restoreById(req.params.id);
  res.json({ message: "User restored", user });
});

/**
 * View deleted users (optional)
 */
app.get("/deleted-users", async (req, res) => {
  const users = await User.find({ isDeleted: true });
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});