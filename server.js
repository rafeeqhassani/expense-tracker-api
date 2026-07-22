const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");
const budgetRoutes = require("./routes/budget");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const activityRoutes = require("./routes/activity");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activities", activityRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
