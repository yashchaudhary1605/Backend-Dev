db.students.find({
    gpa: { $gte: 3.0, $lte: 3.5 }
})