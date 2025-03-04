import {
  addBook,
  getAllBooks,
  deleteBook,
} from "../contollers/bookController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook);
router.get("/all", isAuthenticated, getAllBooks);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteBook
);
export default router;
