const {
  getAllExpenses,
  createExpenseQuery,
  updateExpenseQuery,
  deleteExpenseQuery,
  restoreExpenseQuery,
  clearAllExpensesQuery,
} = require("../db/queries/expenseQueries");

const normalizeExpenseData = require("../utils/normalizeExpenseData");
const apiResponse = require("../utils/apiResponse");

async function getExpensesController(request, response) {
  const expenses = await getAllExpenses();
  apiResponse(response, 200, expenses, "Expenses fetched successfully");
}

async function createExpenseController(request, response) {
  const newExpense = normalizeExpenseData(request.body);

  const createdExpense = await createExpenseQuery(newExpense);

  apiResponse(response, 201, createdExpense, "Expense created successfully");
}

async function updateExpenseController(request, response) {
  const id = request.params.id;

  const updatedExpense = normalizeExpenseData(request.body, id);

  const expense = await updateExpenseQuery(id, updatedExpense);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  apiResponse(response, 200, expense, "Expense updated successfully");
}

async function deleteExpenseController(request, response) {
  const id = request.params.id;

  const expense = await deleteExpenseQuery(id);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  apiResponse(response, 200, expense, "Expense deleted successfully");
}

async function restoreExpenseController(request, response) {
  const id = request.params.id;

  const expense = await restoreExpenseQuery(id);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  apiResponse(response, 200, expense, "Expense restored successfully");
}

async function clearAllExpensesController(request, response) {
  const expenses = await clearAllExpensesQuery();

  apiResponse(response, 200, expenses, "All expenses cleared successfully");
}

module.exports = {
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
  restoreExpenseController,
  clearAllExpensesController,
};
