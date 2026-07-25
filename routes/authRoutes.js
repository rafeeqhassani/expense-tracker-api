const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});

router.post("/register", asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));

module.exports = router;
