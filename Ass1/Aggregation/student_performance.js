db.students.aggregate([{
    $project: {
        name: 1,
        gpa: 1,
        performance: {
            $cond: {
                if: { $gte: ["$gpa", 3.5] },
                then: "Excellent",
                else: {
                    $cond: {
                        if: { $gte: ["$gpa", 3.0] },
                        then: "Good",
                        else: "Average"
                    }
                }
            }
        }
    }
}])