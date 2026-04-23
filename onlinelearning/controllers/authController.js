const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.send("Wrong password");

  // MFA for instructors
  if (user.role === "instructor") {
    const code = Math.floor(100000 + Math.random() * 900000);
    user.mfaCode = code;
    await user.save();
    return res.send(`MFA Code: ${code}`);
  }

  req.session.user = user;
  res.send("Logged in");
};

exports.verifyMFA = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user.mfaCode == req.body.code) {
    req.session.user = user;
    user.mfaCode = null;
    await user.save();
    return res.send("MFA Verified");
  }

  res.send("Invalid MFA");
};