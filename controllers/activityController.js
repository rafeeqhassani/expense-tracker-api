const {
  getAllActivities,
  createActivity,
  clearActivities,
} = require("../db/queries/activityQueries");

const apiResponse = require("../utils/apiResponse");

async function getActivitiesController(req, res, next) {
  const activities = await getAllActivities();

  apiResponse(res, 200, activities);
}

async function createActivityController(req, res, next) {
  const { type, message } = req.body;

  const activity = await createActivity(type, message);

  apiResponse(res, 201, activity);
}

async function clearActivitiesController(req, res, next) {
  await clearActivities();

  apiResponse(res, 200, null, "Activities cleared successfully");
}

module.exports = {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
};
