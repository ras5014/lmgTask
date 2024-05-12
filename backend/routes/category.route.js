const express = require("express");
const router = express.Router();
const {
  getData,
  createCategory,
  createSubCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/getData", getData);
router.post("/createCategory", createCategory);
router.post("/createSubCategory", createSubCategory);
router.put("/editCategory", editCategory);
router.delete("/deleteCategory", deleteCategory);

module.exports = router;
