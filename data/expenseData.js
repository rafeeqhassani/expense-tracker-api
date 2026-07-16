const fs = require("fs");
const path = require("path");

const migrateExpenses = require("../utils/migrateExpenses");
const saveExpenses = require("./fileUtils");

const filePath = path.join(__dirname, "expenses.json");

function getExpenses() {
  const expenses = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const result = migrateExpenses(expenses);

  if (result.changed) {
    saveExpenses(result.expenses);
  }

  return result.expenses;
}

module.exports = getExpenses;
