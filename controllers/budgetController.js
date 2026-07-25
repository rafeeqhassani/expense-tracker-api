const {
  getBudgetByUserId,
  saveBudgetQuery,
} = require("../db/queries/budgetQueries");

const apiResponse = require("../utils/apiResponse");

async function getBudgetController(request, response) {
  const userId = request.user.id;

  const budget = await getBudgetByUserId(userId);

  apiResponse(response, 200, budget, "Budget fetched successfully");
}

async function saveBudgetController(request, response) {
  const userId = request.user.id;

  const budget = request.body;

  const savedBudget = await saveBudgetQuery(userId, budget);

  apiResponse(response, 200, savedBudget, "Budget saved successfully");
}

module.exports = {
  getBudgetController,
  saveBudgetController,
};
