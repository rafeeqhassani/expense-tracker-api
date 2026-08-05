const pool = require("../db");

const mapActivityFromDatabase = require("../../utils/mapActivityFromDatabase");

async function getAllActivities(userId, filters) {
  const { page, limit } = filters;
  const offset = (page - 1) * limit;

  const query = `
    SELECT *
    FROM activities
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const result = await pool.query(query, [userId, limit, offset]);

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

async function getActivityCount(userId) {
  const query = `
    SELECT COUNT(*) 
    FROM activities
    WHERE user_id = $1
  `;

  const result = await pool.query(query, [userId]);

  return Number(result.rows[0].count);
}

async function clearActivities(userId) {
  const query = `
    DELETE FROM activities
    WHERE user_id = $1
  `;

  await pool.query(query, [userId]);
}

async function cleanupOldActivities(userId) {
  const query = `
    DELETE FROM activities
    WHERE user_id = $1
    AND id NOT IN (
      SELECT id
      FROM activities
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 100
    )
  `;

  await pool.query(query, [userId]);
}

module.exports = {
  getAllActivities,
  createActivity,
  getActivityCount,
  clearActivities,
  cleanupOldActivities,
};
