const express = require("express");
const {
  getBudgetController,
  saveBudgetController,
} = require("../controllers/budgetController");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getBudgetController));

router.put("/", asyncHandler(saveBudgetController));

module.exports = router;
