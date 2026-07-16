const express = require("express");
const router = express.Router();

const {
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
  restoreExpenseController,
  clearAllExpensesController,
} = require("../controllers/expenseController");

const asyncHandler = require("../utils/asyncHandler");

const validateExpense = require("../middleware/validateExpense");

router.get("/api/expenses", asyncHandler(getExpensesController));

router.post(
  "/api/expenses",
  validateExpense,
  asyncHandler(createExpenseController),
);

router.put(
  "/api/expenses/:id",
  validateExpense,
  asyncHandler(updateExpenseController),
);

router.delete("/api/expenses/:id", asyncHandler(deleteExpenseController));

router.patch(
  "/api/expenses/:id/restore",
  asyncHandler(restoreExpenseController),
);

router.patch(
  "/api/expenses/clear-all",
  asyncHandler(clearAllExpensesController),
);

module.exports = router;
