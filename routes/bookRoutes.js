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

// DELETE /api/books/:id - Delete a book by ID
router.delete("/books/:id", bookController.deleteBook);

// PUT /api/books/:id - Update a book by ID
router.put("/books/:id", bookController.updateBook);

module.exports = router;
