// models/Book.js
const { genre } = require("../constants/constants");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: {
      genreGroup: {
        type: String,
        enum: ["Fiction", "Nonfiction"],
        required: true,
      },
      genreName: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return genre.some((g) => g.name === value);
          },
          message: (props) => `${props.value} is not a valid genre name`,
        },
      },
    },
    // ...
  },
  { collection: "books", versionKey: false }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
