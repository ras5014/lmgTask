const express = require("express");
const router = express.Router();

const categoryRoutes = require("./category.route");
router.use("/api/v1/category", categoryRoutes);

module.exports = router;
