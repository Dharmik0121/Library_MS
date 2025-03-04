import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/calculateFine.js";

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({
    email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (book.quantity === 0) {
    return next(new ErrorHandler("Book is out of stock", 400));
  }
  const isAlreadyBorrowed = user.borrowedBooks.find(
    (b) => b.bookId.toString() === id && b.returned === false
  );
  if (isAlreadyBorrowed) {
    return next(new ErrorHandler("You have already borrowed this book", 400));
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();
  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save();
  await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    price: book.price,
  });
  res
    .status(200)
    .json({ message: "Book borrowed successfully", success: true });
});

export const returnBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  // Fetch the book correctly
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  // Fetch the user
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check if the user has borrowed this book
  const borrowedBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.returned === false
  );
  if (!borrowedBook) {
    return next(new ErrorHandler("You have not borrowed this book.", 400));
  }

  // Mark the book as returned
  borrowedBook.returned = true;
  await user.save();

  // Increase book quantity
  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save(); // ✅ Now works correctly

  // Fetch borrow record
  const borrow = await Borrow.findOne({
    book: bookId, // Use `book`, not `bookId`
    "user.email": email,
    returnDate: null,
  });
  if (!borrow) {
    return next(new ErrorHandler("You have not borrowed this book.", 400));
  }

  // Set return date and fine
  borrow.returnDate = new Date();
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();

  res.status(200).json({
    message:
      fine !== 0
        ? `Book returned successfully. The total charges, including a fine, are ₹${
            fine + book.price
          }`
        : `Book returned successfully. The total charges are ₹${book.price}`,
    success: true,
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const { borrowedBooks } = req.user;
    res.status(200).json({ success: true, borrowedBooks });
  }
);

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const borrowedBooks = await Borrow.find();
  res.status(200).json({ success: true, borrowedBooks });
});
