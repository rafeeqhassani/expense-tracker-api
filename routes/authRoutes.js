const express = require("express");
const {
  registerController,
  loginController,
  demoController,
} = require("../controllers/authController");

const asyncHandler = require("../utils/asyncHandler");
const validateAuth = require("../middleware/validateAuth");
const authMiddleware = require("../middleware/authMiddleware");
const { findUserByEmail } = require("../db/queries/userQueries");

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await findUserByEmail(req.user.email);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }),
);

router.post("/register", validateAuth, asyncHandler(registerController));
router.post("/login", validateAuth, asyncHandler(loginController));
router.post("/demo", asyncHandler(demoController));
module.exports = router;
