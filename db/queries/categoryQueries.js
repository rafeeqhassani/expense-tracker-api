const pool = require("../db");

async function getAllCategories() {
  const query = `
    SELECT DISTINCT category
    FROM expenses
    WHERE deleted = false
    ORDER BY category ASC
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => row.category);
}

module.exports = {
  getAllCategories,
};
