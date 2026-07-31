const {
  getAllActivities,
  createActivity,
  getActivityCount,
  clearActivities,
} = require("../db/queries/activityQueries");

const apiResponse = require("../utils/apiResponse");

async function getActivitiesController(request, response) {
  const userId = request.user.id;

  const filters = {
    page: Number(request.query.page) || 1,
    limit: Number(request.query.limit) || 10,
  };

  const activities = await getAllActivities(userId, filters);

  const total = await getActivityCount(userId);

  const hasMore = filters.page * filters.limit < total;

  apiResponse(response, 200, {
    activities,
    pagination: {
      page: filters.page,
      limit: filters.limit,
      hasMore,
    },
  });
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
