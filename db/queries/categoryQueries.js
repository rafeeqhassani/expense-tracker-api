const pool = require("../db");

async function getAllCategories() {
  const result = await pool.query(`
    SELECT DISTINCT category
    FROM expenses
    WHERE deleted = false
    ORDER BY category ASC
  `);

  return result.rows.map((row) => row.category);
}

module.exports = {
  getAllCategories,
};
