const pool = require("../db");

async function addConstraint() {
  try {
    await pool.query(`
      ALTER TABLE budgets
      ADD CONSTRAINT budgets_user_id_unique UNIQUE(user_id);
    `);

    console.log("Unique constraint added");
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

addConstraint();
