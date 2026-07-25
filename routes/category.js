const express = require("express");
const {
  getCategoriesController,
} = require("../controllers/categoryController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, asyncHandler(getCategoriesController));

module.exports = router;
