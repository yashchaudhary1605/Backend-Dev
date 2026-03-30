import express from "express";
import { getAllBooks } from "../controllers/book.controller.js";
import validateYear from "../middlewares/validateYear.js";

const router = express.Router();

router.get("/", validateYear, getAllBooks);

export default router;