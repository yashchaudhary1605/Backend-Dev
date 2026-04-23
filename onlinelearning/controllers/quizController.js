const Quiz = require("../models/Quiz");

exports.submitQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.body.quizId);

  if (!quiz) return res.send("Quiz not found");

  if (req.body.answer === quiz.correctAnswer) {
    return res.send("Correct");
  }

  res.send("Wrong");
};