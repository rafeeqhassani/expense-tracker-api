const {
  getBudgetByUserId,
  saveBudgetQuery,
} = require("../db/queries/budgetQueries");

const normalizeExpenseData = require("../utils/normalizeExpenseData");

const apiResponse = require("../utils/apiResponse");

const { TEMP_USER_ID } = require("../constants/appConstants");

async function getBudgetController(req, res) {
  // Temporary user ID until authentication is added
  const userId = TEMP_USER_ID;

  const budget = await getBudgetByUserId(userId);

  apiResponse(res, 200, budget, "Budget fetched successfully");
}

async function saveBudgetController(req, res) {
  const userId = TEMP_USER_ID;

  const budget = req.body;

  const savedBudget = await saveBudgetQuery(userId, budget);

  apiResponse(res, 200, savedBudget, "Budget saved successfully");
}

module.exports = {
  getBudgetController,
  saveBudgetController,
};
