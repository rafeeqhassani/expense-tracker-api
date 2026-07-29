const AppError = require("../utils/AppError");

const MAX_BUDGET_LIMIT = 999999999;

function validateBudget(req, res, next) {
  const { monthlyLimit, categoryLimits } = req.body;

  if (monthlyLimit !== undefined) {
    const monthly = Number(monthlyLimit);

    if (monthly < 0) {
      return next(new AppError("Monthly budget cannot be negative", 400));
    }

    if (monthly > MAX_BUDGET_LIMIT) {
      return next(new AppError("Monthly budget is too large", 400));
    }
  }

  if (categoryLimits) {
    for (const [category, limit] of Object.entries(categoryLimits)) {
      const categoryLimit = Number(limit);

      if (categoryLimit < 0) {
        return next(new AppError(`${category} budget cannot be negative`, 400));
      }

      if (categoryLimit > MAX_BUDGET_LIMIT) {
        return next(new AppError(`${category} budget is too large`, 400));
      }
    }
  }

  next();
}

module.exports = validateBudget;
