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

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 20
 *         description: Number of expenses per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: food
 *         description: Search expenses by title
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: 2026-08
 *         description: Filter expenses by month
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-08-01
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-08-31
 *         description: End date filter
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: date
 *         description: Field used for sorting
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           example: desc
 *         description: Sorting direction
 *     responses:
 *       200:
 *         description: Expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expenses fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     expenses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                           title:
 *                             type: string
 *                             example: Grocery shopping
 *                           amount:
 *                             type: number
 *                             example: 2500
 *                           category:
 *                             type: string
 *                             example: Food
 *                           date:
 *                             type: string
 *                             example: 2026-08-04
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         totalExpenses:
 *                           type: integer
 *                           example: 100
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         hasMore:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/", authMiddleware, asyncHandler(getExpensesController));

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Grocery shopping
 *               amount:
 *                 type: number
 *                 example: 2500
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2026-08-04
 *               recurring:
 *                 type: string
 *                 example: monthly
 *               lastGeneratedDate:
 *                 type: string
 *                 example: 2026-08-01
 *               recurringId:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                     title:
 *                       type: string
 *                       example: Grocery shopping
 *                     amount:
 *                       type: number
 *                       example: 2500
 *                     category:
 *                       type: string
 *                       example: food
 *                     date:
 *                       type: string
 *                       example: 2026-08-04
 *                     recurring:
 *                       type: string
 *                       example: none
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.post(
  "/",
  authMiddleware,
  validateExpense,
  asyncHandler(createExpenseController),
);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Grocery shopping
 *               amount:
 *                 type: number
 *                 example: 3000
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2026-08-04
 *               recurring:
 *                 type: string
 *                 example: none
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                     title:
 *                       type: string
 *                       example: Grocery shopping
 *                     amount:
 *                       type: number
 *                       example: 3000
 *                     category:
 *                       type: string
 *                       example: food
 *                     date:
 *                       type: string
 *                       example: 2026-08-04
 *                     recurring:
 *                       type: string
 *                       example: none
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Expense not found
 */

router.put(
  "/:id",
  authMiddleware,
  validateExpense,
  asyncHandler(updateExpenseController),
);

/**
 * @swagger
 * /api/expenses/bulk:
 *   delete:
 *     summary: Delete multiple expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "787f93b9-235c-4bb9-9315-b86f13fd76d7"
 *                   - "ab12cd34-5678-90ef-gh12-34567890ijkl"
 *     responses:
 *       200:
 *         description: Selected expenses deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                       title:
 *                         type: string
 *                         example: Grocery shopping
 *                       amount:
 *                         type: number
 *                         example: 2500
 *                       category:
 *                         type: string
 *                         example: food
 *                       date:
 *                         type: string
 *                         example: 2026-08-04
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.delete(
  "/bulk",
  authMiddleware,
  asyncHandler(deleteSelectedExpensesController),
);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                     title:
 *                       type: string
 *                       example: Grocery shopping
 *                     amount:
 *                       type: number
 *                       example: 2500
 *                     category:
 *                       type: string
 *                       example: food
 *                     date:
 *                       type: string
 *                       example: 2026-08-04
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Expense not found
 */

router.delete("/:id", authMiddleware, asyncHandler(deleteExpenseController));

/**
 * @swagger
 * /api/expenses/{id}/restore:
 *   patch:
 *     summary: Restore a deleted expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense restored successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                     title:
 *                       type: string
 *                       example: Grocery shopping
 *                     amount:
 *                       type: number
 *                       example: 2500
 *                     category:
 *                       type: string
 *                       example: food
 *                     date:
 *                       type: string
 *                       example: 2026-08-04
 *                     recurring:
 *                       type: string
 *                       example: none
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Expense not found
 */

router.patch(
  "/:id/restore",
  authMiddleware,
  asyncHandler(restoreExpenseController),
);

/**
 * @swagger
 * /api/expenses/clear-all:
 *   patch:
 *     summary: Clear all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All expenses cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All expenses cleared successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                       title:
 *                         type: string
 *                         example: Grocery shopping
 *                       amount:
 *                         type: number
 *                         example: 2500
 *                       category:
 *                         type: string
 *                         example: food
 *                       date:
 *                         type: string
 *                         example: 2026-08-04
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.patch(
  "/clear-all",
  authMiddleware,
  asyncHandler(clearAllExpensesController),
);

module.exports = router;
