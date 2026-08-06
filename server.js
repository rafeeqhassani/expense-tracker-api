require("./config/loadEnv");

const validateEnv = require("./config/env");
validateEnv();

const app = require("./app");
const pool = require("./db/db");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Server running on port ${PORT}`);
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    try {
      await pool.end();
      console.log("Database connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
