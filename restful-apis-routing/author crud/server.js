import express from 'express';  
const app = express();
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
const PORT = 3000;
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.set('view engine', 'ejs');

app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);
});