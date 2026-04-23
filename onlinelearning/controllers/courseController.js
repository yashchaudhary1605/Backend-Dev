const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    instructorId: req.user._id
  });

  res.json(course);
};