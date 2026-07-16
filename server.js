const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenses");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(expenseRoutes);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
