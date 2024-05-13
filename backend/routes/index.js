const express = require("express");
const router = express.Router();

const categoryRoutes = require("./category.route");
const authRoutes = require("./auth.route");

router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/", authRoutes);

module.exports = router;
