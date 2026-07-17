const pool = require("../../db");
const mapExpenseFromDatabase = require("../../utils/mapExpenseFromDatabase");

async function getAllExpenses() {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE deleted = false",
  );

  return result.rows.map(mapExpenseFromDatabase);
}

async function createExpenseQuery(expense) {
  const result = await pool.query(
    `
    INSERT INTO expenses (
      id,
      title,
      amount,
      category,
      date,
      recurring,
      last_generated_date,
      deleted
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `,
    [
      expense.id,
      expense.title,
      expense.amount,
      expense.category,
      expense.date,
      expense.recurring,
      expense.lastGeneratedDate,
      expense.deleted,
    ],
  );

  return mapExpenseFromDatabase(result.rows[0]);
}

async function updateExpenseQuery(id, expense) {
  const result = await pool.query(
    `
    UPDATE expenses
    SET
      title = $1,
      amount = $2,
      category = $3,
      date = $4,
      recurring = $5,
      last_generated_date = $6
    WHERE id = $7
    RETURNING *
    `,
    [
      expense.title,
      expense.amount,
      expense.category,
      expense.date,
      expense.recurring,
      expense.lastGeneratedDate,
      id,
    ],
  );

  return mapExpenseFromDatabase(result.rows[0]);
}

async function deleteExpenseQuery(id) {
  const result = await pool.query(
    `
    UPDATE expenses
    SET deleted = true
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return mapExpenseFromDatabase(result.rows[0]);
}

async function restoreExpenseQuery(id) {
  const result = await pool.query(
    `
    UPDATE expenses
    SET deleted = false
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return mapExpenseFromDatabase(result.rows[0]);
}

async function clearAllExpensesQuery() {
  const result = await pool.query(
    `
    UPDATE expenses
    SET deleted = true
    RETURNING *
    `,
  );

  return result.rows.map(mapExpenseFromDatabase);
}

module.exports = {
  getAllExpenses,
  createExpenseQuery,
  updateExpenseQuery,
  deleteExpenseQuery,
  restoreExpenseQuery,
  clearAllExpensesQuery,
};
