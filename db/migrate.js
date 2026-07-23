const fs = require("fs");
const path = require("path");
const pool = require("./db");

const MIGRATIONS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

/**
 * Ensures the `migrations` bookkeeping table exists.
 */
async function ensureMigrationsTableExists() {
  await pool.query(MIGRATIONS_TABLE_SQL);
}

/**
 * Reads all `.sql` migration files from the migrations directory,
 * sorted in the order they should run.
 *
 * @returns {string[]} Migration file names.
 */
function getMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

/**
 * Fetches the names of migrations that have already been executed.
 *
 * @returns {Promise<string[]>}
 */
async function getExecutedMigrationNames() {
  const result = await pool.query("SELECT name FROM migrations");
  return result.rows.map((row) => row.name);
}

/**
 * Runs a single migration file's SQL and records it as executed.
 */
async function runMigrationFile(fileName) {
  const filePath = path.join(MIGRATIONS_DIR, fileName);
  const sql = fs.readFileSync(filePath, "utf8");

  console.log(`Running ${fileName}`);

  await pool.query(sql);
  await pool.query("INSERT INTO migrations(name) VALUES($1)", [fileName]);

  console.log(`${fileName} completed`);
}

/**
 * Runs all pending `.sql` migrations in order, skipping any that
 * have already been executed.
 */
async function runMigrations() {
  try {
    await ensureMigrationsTableExists();

    const migrationFiles = getMigrationFiles();
    const executedMigrationNames = await getExecutedMigrationNames();

    for (const fileName of migrationFiles) {
      if (executedMigrationNames.includes(fileName)) {
        console.log(`Skipping ${fileName}`);
        continue;
      }

      await runMigrationFile(fileName);
    }

    console.log("All migrations completed");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

runMigrations();
