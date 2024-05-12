const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  children: [],
});

// Create and export the model for the parent schema
const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
