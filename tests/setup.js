const pool = require("../db/db");

afterAll(async () => {
  await pool.end();
});
