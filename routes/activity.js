const express = require("express");

const {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
} = require("../controllers/activityController");

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, asyncHandler(getActivitiesController));

router.post("/", authMiddleware, asyncHandler(createActivityController));

router.delete("/", authMiddleware, asyncHandler(clearActivitiesController));

module.exports = router;
