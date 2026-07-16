const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "expenses.json");

function saveExpenses(expenses) {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

module.exports = saveExpenses;
