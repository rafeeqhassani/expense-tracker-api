const express = require("express");
const {
  registerController,
  loginController,
  demoController,
} = require("../controllers/authController");

const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = require("../middleware/authMiddleware");
const { findUserByEmail } = require("../db/queries/userQueries");

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

router.post("/register", asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));
router.post("/demo", asyncHandler(demoController));
module.exports = router;
