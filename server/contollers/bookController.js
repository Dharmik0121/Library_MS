import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Book } from "../models/bookModel.js";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;
  if (!title || !author || !description || !price || !quantity) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
  });
  res
    .status(201)
    .json({ success: true, message: "Book created successfully", book });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({ success: true, books });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  await book.deleteOne();
  res.status(200).json({ success: true, message: "Book deleted successfully" });
});

export const updateBookQuantity = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 0) {
    return next(new ErrorHandler("Invalid quantity value", 400));
  }

  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  book.quantity = quantity;
  await book.save();

  res
    .status(200)
    .json({ success: true, message: "Book quantity updated", book });
});
