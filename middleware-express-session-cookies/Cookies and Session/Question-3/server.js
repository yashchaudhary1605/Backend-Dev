const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

// Session setup
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false
}));

/**
 * Dummy users (replace with DB in real apps)
 */
const users = [
  { id: 1, username: "admin", password: "123", role: "admin" },
  { id: 2, username: "user", password: "123", role: "user" }
];

/**
 * Middleware: Check Authentication
 */
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Login required" });
  }
  next();
}

/**
 * Middleware: Check Admin Role
 */
function isAdmin(req, res, next) {
  if (req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}

/**
 * LOGIN
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Store user in session
  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  res.json({ message: "Login successful", user: req.session.user });
});

/**
 * LOGOUT
 */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

/**
 * USER DASHBOARD (authenticated users)
 */
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.session.user
  });
});

/**
 * ADMIN PANEL (only admin)
 */
app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin Panel",
    user: req.session.user
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});