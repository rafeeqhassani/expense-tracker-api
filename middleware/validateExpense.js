const NUMERIC_PATTERN_MESSAGE = "cannot be a number";

/**
 * Checks whether a non-empty value represents a numeric string,
 * e.g. "42" or "3.14".
 */
function isNumericString(value) {
  return value !== "" && !isNaN(Number(value));
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

  return null;
}

/**
 * Express middleware that validates an incoming expense payload
 * before it reaches the route handler.
 */
function validateExpense(req, res, next) {
  const { title, amount, category, date } = req.body;

  const titleError = validateTextField(title, "Title");
  if (titleError) {
    return res.status(400).json({ message: titleError });
  }

  const amountError = validateAmount(amount);
  if (amountError) {
    return res.status(400).json({ message: amountError });
  }

  const categoryError = validateTextField(category, "Category");
  if (categoryError) {
    return res.status(400).json({ message: categoryError });
  }

  const dateError = validateDate(date);
  if (dateError) {
    return res.status(400).json({ message: dateError });
  }

  next();
}

module.exports = validateExpense;
