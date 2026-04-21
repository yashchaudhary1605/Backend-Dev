db.students.aggregate([{
    $group: {
        _id: "$city",
        totalStudents: { $sum: 1 }
    }
}])