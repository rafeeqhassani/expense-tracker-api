const express = require("express");
const router = express.Router();

const {
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
  restoreExpenseController,
  clearAllExpensesController,
  deleteSelectedExpensesController,
} = require("../controllers/expenseController");

const asyncHandler = require("../utils/asyncHandler");

const validateExpense = require("../middleware/validateExpense");

router.get("/", asyncHandler(getExpensesController));

router.post("/", validateExpense, asyncHandler(createExpenseController));

router.put("/:id", validateExpense, asyncHandler(updateExpenseController));
router.delete("/bulk", asyncHandler(deleteSelectedExpensesController));
router.delete("/:id", asyncHandler(deleteExpenseController));

router.patch("/:id/restore", asyncHandler(restoreExpenseController));

router.patch("/clear-all", asyncHandler(clearAllExpensesController));

module.exports = router;
