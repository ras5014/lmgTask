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

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
