db.students.find({
    $expr: { $gt: [{ $size: "$courses" }, 5] }
})