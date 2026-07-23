const {
  getBudgetByUserId,
  saveBudgetQuery,
} = require("../db/queries/budgetQueries");

const apiResponse = require("../utils/apiResponse");
const { TEMP_USER_ID } = require("../constants/appConstants");

async function getBudgetController(request, response) {
  // Temporary user ID until authentication is added
  const userId = TEMP_USER_ID;

  const budget = await getBudgetByUserId(userId);

  apiResponse(response, 200, budget, "Budget fetched successfully");
}

async function saveBudgetController(request, response) {
  const userId = TEMP_USER_ID;

  const budget = request.body;

  const savedBudget = await saveBudgetQuery(userId, budget);

  apiResponse(response, 200, savedBudget, "Budget saved successfully");
}

module.exports = {
  getBudgetController,
  saveBudgetController,
};
