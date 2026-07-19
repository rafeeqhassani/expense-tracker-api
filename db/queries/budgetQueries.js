const pool = require("../../db");
const mapBudgetFromDatabase = require("../../utils/mapBudgetFromDatabase");

async function getBudgetByUserId(userId) {
  const result = await pool.query(
    `
    SELECT *
    FROM budgets
    WHERE user_id = $1
    `,
    [userId],
  );

  return mapBudgetFromDatabase(result.rows[0]);
}

async function saveBudgetQuery(userId, budget) {
  const result = await pool.query(
    `
    INSERT INTO budgets (
      user_id,
      monthly_limit,
      category_limits
    )
    VALUES ($1, $2, $3)

    ON CONFLICT (user_id)

    DO UPDATE SET
      monthly_limit = EXCLUDED.monthly_limit,
      category_limits = EXCLUDED.category_limits,
      updated_at = CURRENT_TIMESTAMP

    RETURNING *
    `,
    [userId, budget.monthlyLimit, budget.categoryLimits],
  );

  return mapBudgetFromDatabase(result.rows[0]);
}

module.exports = {
  getBudgetByUserId,
  saveBudgetQuery,
};
