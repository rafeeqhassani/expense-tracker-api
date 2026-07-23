const {
  getAllActivities,
  createActivity,
  clearActivities,
} = require("../db/queries/activityQueries");

const apiResponse = require("../utils/apiResponse");

async function getActivitiesController(request, response) {
  const activities = await getAllActivities();

  apiResponse(response, 200, activities);
}

async function createActivityController(request, response) {
  const { type, message } = request.body;

  const activity = await createActivity(type, message);

  apiResponse(response, 201, activity);
}

async function clearActivitiesController(request, response) {
  await clearActivities();

  apiResponse(response, 200, null, "Activities cleared successfully");
}

module.exports = {
  getActivitiesController,
  createActivityController,
  clearActivitiesController,
};
