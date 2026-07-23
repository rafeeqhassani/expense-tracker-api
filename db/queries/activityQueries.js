const pool = require("../db");

const mapActivityFromDatabase = require("../../utils/mapActivityFromDatabase");

async function getAllActivities() {
  const query = `
    SELECT *
    FROM activities
    ORDER BY created_at DESC
    LIMIT 10
  `;

  const result = await pool.query(query);

  return result.rows.map(mapActivityFromDatabase);
}

async function createActivity(type, message) {
  const query = `
    INSERT INTO activities (type, message)
    VALUES ($1, $2)
    RETURNING *
  `;

  const result = await pool.query(query, [type, message]);

  return mapActivityFromDatabase(result.rows[0]);
}

async function clearActivities() {
  const query = `
    DELETE FROM activities
  `;

  await pool.query(query);
}

module.exports = {
  getAllActivities,
  createActivity,
  clearActivities,
};
