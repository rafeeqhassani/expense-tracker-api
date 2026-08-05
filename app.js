const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const expenseRoutes = require("./routes/expenses");
const budgetRoutes = require("./routes/budget");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const activityRoutes = require("./routes/activity");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(helmet());
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : [];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(apiLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health
 *     description: Returns server health status
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
    },
    message: "Server is healthy",
  });
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
