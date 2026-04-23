const express = require("express");
const router = express.Router();

const { submitQuiz } = require("../controllers/quizController");
const auth = require("../middleware/auth");

router.post("/submit", auth, submitQuiz);

module.exports = router;