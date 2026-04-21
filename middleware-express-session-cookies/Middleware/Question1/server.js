const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Log file path
const logFile = path.join(__dirname, "logs.txt");

// Middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${responseTime}ms\n`;

    fs.appendFile(logFile, log, (err) => {
      if (err) console.error("Error writing log:", err);
    });
  });

  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/user", (req, res) => {
  res.send("User Page");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});