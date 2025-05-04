const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  language: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  summary: {
    type: String
  },
  coverImageUrl: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
