const express = require("express");
const router = express.Router();
const { requireRole, validateToken } = require("../middleware/auth");
const bookController = require("../controllers/bookController");

router.get("/books", bookController.getBooks);

// Public route accessible to all users
router.get("/books", bookController.getAllBooks);

// Protected route accessible to authenticated readers
router.get("/books/:id", validateToken, bookController.getBookById);

// Protected route accessible to authenticated librarians
router.post(
  "/books",
  validateToken,
  requireRole("librarian"),
  bookController.createBook
);

// Genre

router.get("/books/genre/:group", bookController.getBooksByGroup);
router.get("/books/genre/name/:genreName", bookController.getBooksByGenreName);

router.get(
  "/books/genre/:genreGroup/:genreName",
  bookController.getBooksByGroupAndName
);

module.exports = router;
