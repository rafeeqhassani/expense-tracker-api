const pool = require("../db.js");

async function createUser({ name, email, passwordHash }) {
  const result = await pool.query(
    `
    INSERT INTO users
    (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
