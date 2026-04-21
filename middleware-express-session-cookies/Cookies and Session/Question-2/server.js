const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Middleware to get language from cookie
app.use((req, res, next) => {
  req.language = req.cookies.lang || "en"; // default English
  next();
});

/**
 * Home route (shows content based on language)
 */
app.get("/", (req, res) => {
  const messages = {
    en: "Hello!",
    hi: "नमस्ते!",
    fr: "Bonjour!"
  };

  res.send(`
    <h2>${messages[req.language]}</h2>
    <p>Current Language: ${req.language}</p>

    <a href="/set-lang/en">English</a><br/>
    <a href="/set-lang/hi">Hindi</a><br/>
    <a href="/set-lang/fr">French</a>
  `);
});

/**
 * Set language (store in cookie)
 */
app.get("/set-lang/:lang", (req, res) => {
  const lang = req.params.lang;

  // Save cookie for 7 days
  res.cookie("lang", lang, {
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});