const gradeSchema = {
    studentId: ObjectId,
    courseId: ObjectId,
    grade: String
}




// db.grades.insertOne({
//     studentId: ObjectId("STUDENT_ID"),
//     courseId: ObjectId("COURSE_ID"),
//     grade: "A"
// })