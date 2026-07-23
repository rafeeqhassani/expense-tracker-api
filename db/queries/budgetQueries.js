const pool = require("../db");
const mapBudgetFromDatabase = require("../../utils/mapBudgetFromDatabase");

async function getBudgetByUserId(userId) {
  const query = `
    SELECT *
    FROM budgets
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [userId]);

  if (!result.rows[0]) return null;

  return mapBudgetFromDatabase(result.rows[0]);
}

async function saveBudgetQuery(userId, budget) {
  const query = `
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
  `;

  const values = [userId, budget.monthlyLimit, budget.categoryLimits];

  const result = await pool.query(query, values);

  return mapBudgetFromDatabase(result.rows[0]);
}

module.exports = {
  getBudgetByUserId,
  saveBudgetQuery,
};
