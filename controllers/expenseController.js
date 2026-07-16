const getExpenses = require("../data/expenseData");
const saveExpenses = require("../data/fileUtils");

const normalizeExpenseData = require("../utils/normalizeExpenseData");
const apiResponse = require("../utils/apiResponse");

function getExpensesController(request, response) {
  const expenses = getExpenses();
  apiResponse(response, 200, expenses, "Expenses fetched successfully");
}

function createExpenseController(request, response) {
  const newExpense = normalizeExpenseData(request.body);

  const expenses = getExpenses();

  expenses.push(newExpense);

  saveExpenses(expenses);

  apiResponse(response, 201, newExpense, "Expense created successfully");
}

function updateExpenseController(request, response) {
  const id = request.params.id;

  const expenses = getExpenses();

  const expense = expenses.find((item) => item && item.id == id);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedExpense = normalizeExpenseData(request.body, expense.id);

  Object.assign(expense, updatedExpense);

  saveExpenses(expenses);

  apiResponse(response, 200, expense, "Expense updated successfully");
}

function deleteExpenseController(request, response) {
  const id = request.params.id;

  const expenses = getExpenses();

  const expense = expenses.find((item) => item && item.id == id);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  expense.deleted = true;

  saveExpenses(expenses);

  apiResponse(response, 200, expense, "Expense deleted successfully");
}

function restoreExpenseController(request, response) {
  const id = request.params.id;

  const expenses = getExpenses();

  const expense = expenses.find((item) => item && item.id == id);

  if (!expense) {
    const error = new Error("Expense not found");
    error.statusCode = 404;
    throw error;
  }

  expense.deleted = false;

  saveExpenses(expenses);

  apiResponse(response, 200, expense, "Expense restored successfully");
}

function clearAllExpensesController(request, response) {
  const expenses = getExpenses();

  const updatedExpenses = expenses.map((expense) => ({
    ...expense,
    deleted: true,
  }));

  saveExpenses(updatedExpenses);

  apiResponse(
    response,
    200,
    updatedExpenses,
    "All expenses cleared successfully",
  );
}

module.exports = {
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
  restoreExpenseController,
  clearAllExpensesController,
};
