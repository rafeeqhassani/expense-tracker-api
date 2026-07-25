const {
  getAllExpenses,
  createExpenseQuery,
  updateExpenseQuery,
  deleteExpenseQuery,
  restoreExpenseQuery,
  clearAllExpensesQuery,
  getExpensesCountQuery,
  deleteSelectedExpenses,
} = require("../db/queries/expenseQueries");

const { processRecurringExpenses } = require("../services/recurringService");

const normalizeExpenseData = require("../utils/normalizeExpenseData");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

async function getExpensesController(request, response) {
  const userId = request.user.id;

  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 20;

  const filters = {
    page,
    limit,
    search: request.query.search || "",
    month: request.query.month || "",
    startDate: request.query.startDate || "",
    endDate: request.query.endDate || "",
    sortBy: request.query.sortBy || "date",
    sortOrder: request.query.sortOrder || "desc",
  };

  await processRecurringExpenses(userId);

  const expenses = await getAllExpenses(userId, filters);
  const totalExpenses = await getExpensesCountQuery(userId, filters);
  const totalPages = Math.ceil(totalExpenses / limit);

  apiResponse(
    response,
    200,
    {
      expenses,
      pagination: {
        page,
        limit,
        totalExpenses,
        totalPages,
      },
    },
    "Expenses fetched successfully",
  );
}

async function createExpenseController(request, response) {
  const userId = request.user.id;

  const newExpense = normalizeExpenseData(request.body);

  const createdExpense = await createExpenseQuery(userId, newExpense);

  apiResponse(response, 201, createdExpense, "Expense created successfully");
}

async function updateExpenseController(request, response) {
  const id = request.params.id;
  const userId = request.user.id;

  const updatedExpense = normalizeExpenseData(request.body, id);

  const expense = await updateExpenseQuery(id, userId, updatedExpense);

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  apiResponse(response, 200, expense, "Expense updated successfully");
}

async function deleteExpenseController(request, response) {
  const id = request.params.id;
  const userId = request.user.id;

  const expense = await deleteExpenseQuery(id, userId);

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  apiResponse(response, 200, expense, "Expense deleted successfully");
}

async function restoreExpenseController(request, response) {
  const id = request.params.id;
  const userId = request.user.id;

  const expense = await restoreExpenseQuery(id, userId);

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  apiResponse(response, 200, expense, "Expense restored successfully");
}

async function clearAllExpensesController(request, response) {
  const userId = request.user.id;

  const expenses = await clearAllExpensesQuery(userId);

  apiResponse(response, 200, expenses, "All expenses cleared successfully");
}

async function deleteSelectedExpensesController(request, response) {
  const { ids } = request.body;
  const userId = request.user.id;

  const deletedExpenses = await deleteSelectedExpenses(ids, userId);

  apiResponse(response, 200, deletedExpenses);
}

module.exports = {
  getExpensesController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
  restoreExpenseController,
  clearAllExpensesController,
  deleteSelectedExpensesController,
};
