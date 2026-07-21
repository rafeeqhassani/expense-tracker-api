const express = require("express");

const {
  getSummaryController,
  getDashboardController,
  getChartsController,
} = require("../controllers/analyticsController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/summary", asyncHandler(getSummaryController));
router.get("/dashboard", asyncHandler(getDashboardController));
router.get("/charts", asyncHandler(getChartsController));

module.exports = router;
