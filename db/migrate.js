const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function runMigrations() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsPath = path.join(__dirname, "migrations");

    const files = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const executed = await pool.query("SELECT name FROM migrations");

    const executedMigrations = executed.rows.map((row) => row.name);

    for (const file of files) {
      if (executedMigrations.includes(file)) {
        console.log(`Skipping ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");

      console.log(`Running ${file}`);

      await pool.query(sql);

      await pool.query("INSERT INTO migrations(name) VALUES($1)", [file]);

      console.log(`${file} completed`);
    }

    console.log("All migrations completed");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

runMigrations();
