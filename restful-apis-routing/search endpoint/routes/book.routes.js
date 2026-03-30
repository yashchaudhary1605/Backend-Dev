import express from "express";
import {
  getAllBooks,
  searchBooksByTitle
} from "../controllers/book.controller.js";
import validateYear from "../middlewares/middleware.js";

const router = express.Router();

router.get("/search", searchBooksByTitle);
router.get("/", validateYear, getAllBooks);

export default router;