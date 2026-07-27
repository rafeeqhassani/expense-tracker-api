const pool = require("../db");

const mapActivityFromDatabase = require("../../utils/mapActivityFromDatabase");

async function getAllActivities(userId) {
  const query = `
    SELECT *
    FROM activities
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 10
  `;

  const result = await pool.query(query, [userId]);

  return result.rows.map(mapActivityFromDatabase);
}

async function createActivity(userId, type, message) {
  const query = `
    INSERT INTO activities (user_id, type, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(query, [userId, type, message]);

  return mapActivityFromDatabase(result.rows[0]);
}

async function clearActivities(userId) {
  console.log("CLEAR QUERY USER:", userId);

  const query = `
    DELETE FROM activities
    WHERE user_id = $1
  `;

  await pool.query(query, [userId]);
}

module.exports = {
  getAllActivities,
  createActivity,
  clearActivities,
};
