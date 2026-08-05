const express = require("express");
const {
  getCategoriesController,
} = require("../controllers/categoryController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get user expense categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
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
 *                     type: string
 *                   example:
 *                     - food
 *                     - transport
 *                     - shopping
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/", authMiddleware, asyncHandler(getCategoriesController));

module.exports = router;
