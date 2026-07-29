const express = require("express");
const {
  getBudgetController,
  saveBudgetController,
} = require("../controllers/budgetController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const validateBudget = require("../middleware/validateBudget");
const router = express.Router();

router.get("/", authMiddleware, asyncHandler(getBudgetController));

router.put(
  "/",
  authMiddleware,
  validateBudget,
  asyncHandler(saveBudgetController),
);

module.exports = router;
