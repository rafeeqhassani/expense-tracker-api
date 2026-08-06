const express = require("express");
const {
  registerController,
  loginController,
  demoController,
} = require("../controllers/authController");

const { findUserById } = require("../db/queries/userQueries");
const AppError = require("../utils/AppError");

const asyncHandler = require("../utils/asyncHandler");
const validateAuth = require("../middleware/validateAuth");
const { authLimiter } = require("../middleware/rateLimiter");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await findUserById(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }),
);

router.post(
  "/register",
  authLimiter,
  validateAuth,
  asyncHandler(registerController),
);

router.post("/login", authLimiter, validateAuth, asyncHandler(loginController));

router.post("/demo", authLimiter, asyncHandler(demoController));
module.exports = router;
