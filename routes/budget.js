const express = require("express");
const {
  getBudgetController,
  saveBudgetController,
} = require("../controllers/budgetController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const validateBudget = require("../middleware/validateBudget");
const router = express.Router();

/**
 * @swagger
 * /api/budget:
 *   get:
 *     summary: Get user budget
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Budget fetched successfully
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
 *                   example: Budget fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     monthlyLimit:
 *                       type: number
 *                       example: 50000
 *                     categoryLimits:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                       example:
 *                         Food: 15000
 *                         Transport: 5000
 *                         Shopping: 10000
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/", authMiddleware, asyncHandler(getBudgetController));

/**
 * @swagger
 * /api/budget:
 *   put:
 *     summary: Update user budget
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monthlyLimit:
 *                 type: number
 *                 example: 50000
 *               categoryLimits:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *                 example:
 *                   Food: 15000
 *                   Transport: 5000
 *                   Shopping: 10000
 *     responses:
 *       200:
 *         description: Budget saved successfully
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
 *                   example: Budget saved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     monthlyLimit:
 *                       type: number
 *                       example: 50000
 *                     categoryLimits:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                       example:
 *                         Food: 15000
 *                         Transport: 5000
 *                         Shopping: 10000
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.put(
  "/",
  authMiddleware,
  validateBudget,
  asyncHandler(saveBudgetController),
);

module.exports = router;
