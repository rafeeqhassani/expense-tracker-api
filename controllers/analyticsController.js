const {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
} = require("../db/queries/analyticsQueries");

const apiResponse = require("../utils/apiResponse");

async function getSummaryController(request, response) {
  const userId = request.user.id;

  const summary = await getAnalyticsSummary(userId);

  apiResponse(response, 200, summary);
}

async function getDashboardController(request, response) {
  const userId = request.user.id;
  const dashboard = await getDashboardStats(userId);

  apiResponse(response, 200, dashboard);
}

async function getChartsController(request, response) {
  const userId = request.user.id;
  const charts = await getChartData(userId);

  apiResponse(response, 200, charts);
}

module.exports = {
  getSummaryController,
  getDashboardController,
  getChartsController,
};
