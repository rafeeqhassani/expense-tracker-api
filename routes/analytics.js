const express = require("express");

const {
  getSummaryController,
  getDashboardController,
  getChartsController,
} = require("../controllers/analyticsController");

const {
  getCategoryAnalyticsController,
} = require("../controllers/categoryAnalyticsController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get expense summary analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     overall:
 *                       type: object
 *                       properties:
 *                         totalAmount:
 *                           type: number
 *                           example: 150000
 *                         totalRecords:
 *                           type: integer
 *                           example: 120
 *                         averageExpense:
 *                           type: number
 *                           example: 1250
 *                         highestExpense:
 *                           type: number
 *                           example: 10000
 *                         lowestExpense:
 *                           type: number
 *                           example: 100
 *                         averageDailySpending:
 *                           type: number
 *                           example: 5000
 *                     filtered:
 *                       type: object
 *                       properties:
 *                         totalAmount:
 *                           type: number
 *                           example: 50000
 *                         totalRecords:
 *                           type: integer
 *                           example: 30
 *                         averageExpense:
 *                           type: number
 *                           example: 1666
 *                         highestExpense:
 *                           type: number
 *                           example: 8000
 *                         lowestExpense:
 *                           type: number
 *                           example: 200
 *                         averageDailySpending:
 *                           type: number
 *                           example: 3000
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/summary", authMiddleware, asyncHandler(getSummaryController));

/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     expensesToday:
 *                       type: number
 *                       example: 5000
 *                     expensesThisWeek:
 *                       type: number
 *                       example: 25000
 *                     expensesThisMonth:
 *                       type: number
 *                       example: 80000
 *                     expensesThisYear:
 *                       type: number
 *                       example: 900000
 *                     totalCategories:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/dashboard", authMiddleware, asyncHandler(getDashboardController));

/**
 * @swagger
 * /api/analytics/charts:
 *   get:
 *     summary: Get expense chart analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chart analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: Food
 *                           total:
 *                             type: number
 *                             example: 50000
 *                     monthly:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             example: Aug 2026
 *                           total:
 *                             type: number
 *                             example: 80000
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/charts", authMiddleware, asyncHandler(getChartsController));

/**
 * @swagger
 * /api/analytics/categories:
 *   get:
 *     summary: Get category analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category analytics fetched successfully
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
 *                       category:
 *                         type: string
 *                         example: Food
 *                       total:
 *                         type: number
 *                         example: 50000
 *                       count:
 *                         type: integer
 *                         example: 20
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get(
  "/categories",
  authMiddleware,
  asyncHandler(getCategoryAnalyticsController),
);
module.exports = router;
