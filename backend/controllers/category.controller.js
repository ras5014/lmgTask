const mongoose = require("mongoose");
const Category = require("../models/category.model");

// Get all categories
const getData = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0)
      return res.status(404).json({ message: "No categories found" });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new sub-category
const createSubCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;

    const category = new Category({ label: req.body.label, children: [] });
    await category.save();

    const parentCategory = await Category.findById(categoryId);
    parentCategory.children.push(category._id);
    await parentCategory.save();

    if (parentCategory) {
      res.status(200).json(parentCategory);
    } else {
      res.status(404).json({ message: "Parent category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a category
const editCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;
    const newLabel = req.body.label; // Assuming "label" property holds the new name

    // Find the category to update
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category's label
    category.label = newLabel;

    // Save the updated category
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newId = new mongoose.Types.ObjectId(categoryId);
    await Category.updateMany(
      { children: newId },
      { $pull: { children: newId } }
    );

    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getData,
  createCategory,
  createSubCategory,
  editCategory,
  deleteCategory,
};
