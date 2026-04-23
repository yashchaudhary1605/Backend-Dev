const express = require("express");
const router = express.Router();

const { createCourse } = require("../controllers/courseController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { sanitizeCourse } = require("../middleware/sanitize");

router.post("/", auth, allowRoles("instructor"), sanitizeCourse, createCourse);

module.exports = router;