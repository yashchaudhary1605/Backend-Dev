const express = require("express");
const sanitizeMiddleware = require("./sanitizeMiddleware");

const app = express();
app.use(express.json());

// Apply globally
app.use(sanitizeMiddleware);

// Test route
app.post("/data", (req, res) => {
  res.json({
    message: "Sanitized Data",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});