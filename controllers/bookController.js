const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const fuzzball = require("fuzzball");
const { userRoles, genre } = require("../constants/constants");

// filter books
const getBooks = async (req, res) => {
  const { title, author, genreGroup, genreName, status, borrower } = req.body;

  // Build the query object based on the provided parameters
  const query = {};

  // Apply fuzzy matching for title
  if (title) {
    const books = await Book.find({});
    const matchedTitles = books.filter((book) => {
      const ratio = fuzzball.token_set_ratio(title, book.title);
      return ratio >= 50; // Set the threshold for fuzzy matching here (e.g., 50%)
    });
    query.title = { $in: matchedTitles.map((book) => book.title) };
  }

  // Apply direct comparison for genreGroup and genreName
  if (author) query.author = { $regex: new RegExp(author, "i") };
  if (genreGroup) {
    query["genre.genreGroup"] = genreGroup;
  }
  if (genreName && genre.some((g) => g.name === genreName)) {
    query["genre.genreName"] = genreName;
  }
  if (status) query.status = { $regex: new RegExp(status, "i") };
  if (borrower) query.borrower = { $regex: new RegExp(borrower, "i") };

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    // Extract the book data from the request body
    const { title, author, description, genreGroup, genreName } = req.body;

    // Create a new book instance
    const book = new Book({
      title,
      author,
      description,
      genre: {
        genreGroup,
        genreName,
      },
    });

    // Save the book to the database
    await book.save();

    res
      .status(201)
      .json({ message: "Book created successfully", book: book.toObject() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // GENREEE

// // genre group

// const getBooksByGroup = async (req, res) => {
//   const { group } = req.params;

//   try {
//     const books = await Book.find({ "genre.genreGroup": group });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// };

// // genre name
// // genre name
// // genre name
// const getBooksByGenreName = async (req, res) => {
//   const { genreName } = req.params;

//   try {
//     const books = await Book.find({ "genre.genreName": genreName });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// };

// // Get books by genre group and genre name
// const getBooksByGroupAndName = async (req, res) => {
//   const { genreGroup, genreName } = req.params;

//   try {
//     const books = await Book.find({
//       "genre.genreGroup": genreGroup,
//       "genre.genreName": genreName,
//     });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// };

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
