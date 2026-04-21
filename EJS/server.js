import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// fix __dirname for ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// fake database
let userData = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Mike Johnson", age: 35 },
];

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/user", (req, res) => {
    res.render("user", { userData });
});

app.post("/api/user", (req, res) => {
    const { name, age } = req.body;

    const newUser = {
        id: userData.length + 1,
        name,
        age,
    };

    userData.push(newUser);
    res.redirect("/user");
});

// delete user
app.get("/api/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const idx = userData.findIndex(u => u.id === userId);

    if (idx === -1) {
        return res.status(404).render("404");
    }

    userData.splice(idx, 1);
    res.redirect("/user");
});

app.get("/list", (req, res) => {
    const arr = ["apple", "banana", "grapes", "mango"];
    res.render("list", { arr });
});
/

// 404 fallback
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});