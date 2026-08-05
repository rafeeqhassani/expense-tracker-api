const express = require("express");

const {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
} = require("../controllers/activityController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get user activities
 *     tags: [Activities]
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
 *           example: 10
 *         description: Number of activities per page
 *     responses:
 *       200:
 *         description: Activities fetched successfully
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
 *                     activities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                           type:
 *                             type: string
 *                             example: expense_created
 *                           message:
 *                             type: string
 *                             example: Added grocery expense
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-08-04T10:00:00.000Z
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         hasMore:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/", authMiddleware, asyncHandler(getActivitiesController));

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: expense_created
 *               message:
 *                 type: string
 *                 example: Added grocery expense
 *     responses:
 *       201:
 *         description: Activity created successfully
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
 *                     id:
 *                       type: string
 *                       example: 787f93b9-235c-4bb9-9315-b86f13fd76d7
 *                     type:
 *                       type: string
 *                       example: expense_created
 *                     message:
 *                       type: string
 *                       example: Added grocery expense
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-08-04T10:00:00.000Z
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.post("/", authMiddleware, asyncHandler(createActivityController));

/**
 * @swagger
 * /api/activities:
 *   delete:
 *     summary: Clear all user activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activities cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Activities cleared successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.delete("/", authMiddleware, asyncHandler(clearActivitiesController));

module.exports = router;
