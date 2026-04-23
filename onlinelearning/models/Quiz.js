const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: String,
  question: String,
  correctAnswer: String
});

module.exports = mongoose.model("Quiz", quizSchema);