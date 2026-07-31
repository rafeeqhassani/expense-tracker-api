const pool = require("../db");

async function getCategoryAnalytics(userId) {
  const query = `
    SELECT
      category,
      COALESCE(SUM(amount), 0) AS total,
      COUNT(*) AS count
    FROM expenses
    WHERE user_id = $1
    AND deleted = false
    GROUP BY category
    ORDER BY total DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

module.exports = {
  getCategoryAnalytics,
};
