const express = require("express");
const {
  getCategoriesController,
} = require("../controllers/categoryController");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getCategoriesController));

module.exports = router;
