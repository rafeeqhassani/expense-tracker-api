require("../config/loadEnv");

const { Pool } = require("pg");

console.log("Environment:", process.env.NODE_ENV);
console.log(
  "Database:",
  process.env.DATABASE_URL ? "Connected URL loaded" : "Missing",
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
