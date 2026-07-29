const AppError = require("../utils/AppError");

const MAX_AMOUNT = 999999999.99;
const DECIMAL_PATTERN = /^\d+(\.\d{1,2})?$/;
const NUMERIC_PATTERN_MESSAGE = "cannot be a number";

/**
 * Checks whether a non-empty value represents a numeric string,
 * e.g. "42" or "3.14".
 */
function isNumericString(value) {
  const trimmedValue = value.trim();

  return trimmedValue !== "" && !isNaN(Number(trimmedValue));
}

/**
 * Validates a required text field (e.g. title, category) that
 * must be present and must not be purely numeric.
 *
 * @returns {string|null} An error message, or null if valid.
 */
function validateTextField(value, fieldName) {
  if (!value) {
    return `${fieldName} is required`;
  }

  if (isNumericString(value)) {
    return `${fieldName} ${NUMERIC_PATTERN_MESSAGE}`;
  }

  return null;
}

/**
 * Validates the expense amount: required, numeric, and positive.
 *
 * @returns {string|null} An error message, or null if valid.
 */
function validateAmount(amount) {
  if (amount === undefined || amount === null || amount === "") {
    return "Amount is required";
  }

  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
    return "Amount must be a number";
  }

  if (!DECIMAL_PATTERN.test(String(amount))) {
    return "Amount can have maximum 2 decimal places";
  }

  if (numericAmount > MAX_AMOUNT) {
    return "Amount is too large";
  }

  if (numericAmount <= 0) {
    return "Amount must be positive";
  }

  return null;
}

/**
 * Validates the expense date: required and parseable.
 *
 * @returns {string|null} An error message, or null if valid.
 */

function validateDate(date) {
  if (!date) {
    return "Date is required";
  }

  if (isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  if (new Date(date) > new Date()) {
    return "Date cannot be in the future";
  }

  return null;
}

/**
 * Express middleware that validates an incoming expense payload
 * before it reaches the route handler.
 */
function validateExpense(req, res, next) {
  const title = req.body.title?.trim();
  const category = req.body.category?.trim();
  const { amount, date } = req.body;

  req.body.title = title;
  req.body.category = category;

  const titleError = validateTextField(title, "Title");
  if (titleError) {
    return next(new AppError(titleError, 400));
  }

  const amountError = validateAmount(amount);
  if (amountError) {
    return next(new AppError(amountError, 400));
  }

  const categoryError = validateTextField(category, "Category");
  if (categoryError) {
    return next(new AppError(categoryError, 400));
  }

  const dateError = validateDate(date);
  if (dateError) {
    return next(new AppError(dateError, 400));
  }

  next();
}

module.exports = validateExpense;
