const {
  getAllActivities,
  createActivity,
  clearActivities,
} = require("../db/queries/activityQueries");

const apiResponse = require("../utils/apiResponse");

async function getActivitiesController(request, response) {
  const userId = request.user.id;

  const activities = await getAllActivities(userId);

  apiResponse(response, 200, activities);
}

async function createActivityController(request, response) {
  const userId = request.user.id;

  const { type, message } = request.body;

  const activity = await createActivity(userId, type, message);

  apiResponse(response, 201, activity);
}

async function clearActivitiesController(request, response) {
  const userId = request.user.id;

  await clearActivities(userId);

  apiResponse(response, 200, null, "Activities cleared successfully");
}

module.exports = {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
};
