const pool = require("../db");

async function getAllActivities() {
  const result = await pool.query(`
    SELECT *
    FROM activities
    ORDER BY created_at DESC
    LIMIT 10
  `);

  return result.rows;
}

async function createActivity(type, message) {
  const result = await pool.query(
    `
    INSERT INTO activities (type, message)
    VALUES ($1, $2)
    RETURNING *
    `,
    [type, message],
  );

  return result.rows[0];
}

async function clearActivities() {
  await pool.query(`
    DELETE FROM activities
  `);
}

module.exports = {
  getAllActivities,
  createActivity,
  clearActivities,
};
