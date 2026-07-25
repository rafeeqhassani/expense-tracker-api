const express = require("express");

const {
  getSummaryController,
  getDashboardController,
  getChartsController,
} = require("../controllers/analyticsController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/summary", authMiddleware, asyncHandler(getSummaryController));
router.get("/dashboard", authMiddleware, asyncHandler(getDashboardController));
router.get("/charts", authMiddleware, asyncHandler(getChartsController));

module.exports = router;
