const express = require("express");
const session = require("express-session");

const app = express();

// Session setup (2 min expiry)
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 1000 // 2 minutes
  }
}));

/**
 * Home page with session timer
 */
app.get("/", (req, res) => {
  req.session.user = "Raghav"; // simulate login

  res.send(`
    <h2>Session Timeout Demo</h2>
    <p id="status">Session Active</p>

    <script>
      let sessionTime = 120; // 120 seconds
      let warningTime = 30;  // warn before 30 sec

      const status = document.getElementById("status");

      const timer = setInterval(() => {
        sessionTime--;

        if (sessionTime === warningTime) {
          alert("⚠️ Your session will expire in 30 seconds!");
        }

        if (sessionTime <= 0) {
          clearInterval(timer);
          status.innerText = "Session Expired";
        }
      }, 1000);
    </script>
  `);
});

/**
 * Check session (optional API)
 */
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ active: true });
  } else {
    res.json({ active: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});