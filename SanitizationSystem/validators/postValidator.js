const { body } = require("express-validator");

exports.postValidation = [
  body("content").isLength({ min: 1 })
];