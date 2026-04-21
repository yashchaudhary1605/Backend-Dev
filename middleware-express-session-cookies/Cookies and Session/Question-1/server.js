const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true
}));

/**
 * STEP 1: Basic Info
 */
app.get("/step1", (req, res) => {
  res.send(`
    <h2>Step 1: Basic Info</h2>
    <form method="POST" action="/step1">
      Name: <input type="text" name="name" required /><br/>
      Email: <input type="email" name="email" required /><br/>
      <button type="submit">Next</button>
    </form>
  `);
});

app.post("/step1", (req, res) => {
  req.session.user = {
    name: req.body.name,
    email: req.body.email
  };

  res.redirect("/step2");
});

/**
 * STEP 2: Address
 */
app.get("/step2", (req, res) => {
  res.send(`
    <h2>Step 2: Address</h2>
    <form method="POST" action="/step2">
      City: <input type="text" name="city" required /><br/>
      Country: <input type="text" name="country" required /><br/>
      <button type="submit">Next</button>
    </form>
  `);
});

app.post("/step2", (req, res) => {
  req.session.user = {
    ...req.session.user,
    city: req.body.city,
    country: req.body.country
  };

  res.redirect("/step3");
});

/**
 * STEP 3: Password
 */
app.get("/step3", (req, res) => {
  res.send(`
    <h2>Step 3: Security</h2>
    <form method="POST" action="/step3">
      Password: <input type="password" name="password" required /><br/>
      <button type="submit">Finish</button>
    </form>
  `);
});

app.post("/step3", (req, res) => {
  req.session.user = {
    ...req.session.user,
    password: req.body.password
  };

  res.redirect("/summary");
});

/**
 * SUMMARY PAGE
 */
app.get("/summary", (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/step1");
  }

  res.send(`
    <h2>Registration Complete</h2>
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>City: ${user.city}</p>
    <p>Country: ${user.country}</p>
  `);
});

/**
 * RESET SESSION
 */
app.get("/reset", (req, res) => {
  req.session.destroy(() => {
    res.send("Session cleared. <a href='/step1'>Start Again</a>");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});