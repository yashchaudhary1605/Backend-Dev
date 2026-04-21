db.students.aggregate([
    { $unwind: "$courses" },
    {
        $group: {
            _id: "$courses",
            count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
])