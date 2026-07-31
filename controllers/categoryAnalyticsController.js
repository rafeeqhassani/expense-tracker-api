const {
  getCategoryAnalytics,
} = require("../db/queries/categoryAnalyticsQueries");

const apiResponse = require("../utils/apiResponse");

async function getCategoryAnalyticsController(request, response) {
  const userId = request.user.id;

  const categories = await getCategoryAnalytics(userId);

  apiResponse(response, 200, categories);
}

module.exports = {
  getCategoryAnalyticsController,
};
