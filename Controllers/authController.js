import bcrypt from 'bcryptjs';
import User from '../model/userSchema.js';
export const signup = async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body); 

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json
      ({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json
      ({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({
      message: "Error",
      error: err.message
    });
  }
};
export const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body); 
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json
      ({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json
      ({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Error",
      error: err.message
    });
  }
};