process.env.NODE_ENV = "test";

const pool = require("../db/db");

afterAll(async () => {
  await pool.end();
});
