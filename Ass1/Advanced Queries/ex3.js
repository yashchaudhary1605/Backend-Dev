db.students.find()
    .sort({ gpa: -1 })
    .limit(10)