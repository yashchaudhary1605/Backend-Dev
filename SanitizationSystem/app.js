const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 30
  }
}));


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;