const express = require("express");
const helmetConfig = require("./config/helmet");
const cors = require("cors");
const sessionConfig = require("./config/session");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(helmetConfig);

app.use(morgan("combined"));

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));


app.use(sessionConfig);

app.get("/", (req, res) => {
  res.send("EduLearn API running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quiz", quizRoutes);

module.exports = app;