const courseSchema = {
    name: String,
    code: String,
    credits: Number,
    prerequisites: [String]
}




// db.courses.insertOne({
//     name: "Machine Learning",
//     code: "ML101",
//     credits: 4,
//     prerequisites: ["Maths", "Statistics"]
// })