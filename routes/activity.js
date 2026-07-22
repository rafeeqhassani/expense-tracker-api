const express = require("express");

const {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
} = require("../controllers/activityController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getActivitiesController));

router.post("/", asyncHandler(createActivityController));

router.delete("/", asyncHandler(clearActivitiesController));

module.exports = router;
