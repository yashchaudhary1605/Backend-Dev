const { body } = require("express-validator");
const validator = require("validator");

exports.registerValidation = [
  body("username").isLength({ min: 3 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("bio").optional().escape(),
  body("profileUrl").optional().custom((val) => {
    if (!validator.isURL(val, { protocols: ["http","https"] })) {
      throw new Error("Invalid URL");
    }
    return true;
  })
];