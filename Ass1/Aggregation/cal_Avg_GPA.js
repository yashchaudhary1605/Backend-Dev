db.students.aggregate([{
    $group: {
        _id: "$department",
        avgGPA: { $avg: "$gpa" }
    }
}])