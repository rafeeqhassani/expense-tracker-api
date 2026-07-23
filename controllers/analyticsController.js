const {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
} = require("../db/queries/analyticsQueries");

const apiResponse = require("../utils/apiResponse");

async function getSummaryController(request, response) {
  const summary = await getAnalyticsSummary();

  apiResponse(response, 200, summary);
}

async function getDashboardController(request, response) {
  const dashboard = await getDashboardStats();

  apiResponse(response, 200, dashboard);
}

async function getChartsController(request, response) {
  const charts = await getChartData();

  apiResponse(response, 200, charts);
}

module.exports = {
  getSummaryController,
  getDashboardController,
  getChartsController,
};
