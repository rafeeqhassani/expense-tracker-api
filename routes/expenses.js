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
const authMiddleware = require("../middleware/authMiddleware");

const validateExpense = require("../middleware/validateExpense");

router.get("/", authMiddleware, asyncHandler(getExpensesController));

router.post(
  "/",
  authMiddleware,
  validateExpense,
  asyncHandler(createExpenseController),
);

router.put(
  "/:id",
  authMiddleware,
  validateExpense,
  asyncHandler(updateExpenseController),
);
router.delete(
  "/bulk",
  authMiddleware,
  asyncHandler(deleteSelectedExpensesController),
);
router.delete("/:id", authMiddleware, asyncHandler(deleteExpenseController));

router.patch(
  "/:id/restore",
  authMiddleware,
  asyncHandler(restoreExpenseController),
);

router.patch(
  "/clear-all",
  authMiddleware,
  asyncHandler(clearAllExpensesController),
);

module.exports = router;
