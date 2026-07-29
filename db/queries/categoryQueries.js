const pool = require("../db");

async function getAllCategories(userId) {
  const query = `
    SELECT DISTINCT category
    FROM expenses
    WHERE user_id = $1
    AND deleted = false
    ORDER BY category ASC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows.map((row) => row.category);
}

module.exports = {
  getAllCategories,
};
