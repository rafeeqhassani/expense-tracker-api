const {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
} = require("../db/queries/analyticsQueries");

const apiResponse = require("../utils/apiResponse");

async function getSummaryController(req, res) {
  const summary = await getAnalyticsSummary();

  apiResponse(res, 200, summary);
}

async function getDashboardController(req, res) {
  const dashboard = await getDashboardStats();

  apiResponse(res, 200, dashboard);
}

async function getChartsController(req, res) {
  const charts = await getChartData();

  apiResponse(res, 200, charts);
}

module.exports = {
  getSummaryController,
  getDashboardController,
  getChartsController,
};
