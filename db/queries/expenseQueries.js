const pool = require("../db");
const mapExpenseFromDatabase = require("../../utils/mapExpenseFromDatabase");

async function getAllExpenses(filters) {
  const { page, limit, search, month, startDate, endDate, sortBy, sortOrder } =
    filters;

  const offset = (page - 1) * limit;

  let query = `
SELECT *
FROM expenses
WHERE deleted = false
`;

  const values = [];
  let index = 1;

  if (search) {
    query += `
  AND (
    title ILIKE $${index}
    OR category ILIKE $${index}
    OR CAST(amount AS TEXT) ILIKE $${index}
  )
  `;

    values.push(`%${search}%`);
    index++;
  }

  if (month) {
    query += `
    AND EXTRACT(MONTH FROM date) = $${index}
  `;

    values.push(Number(month));
    index++;
  }

  if (startDate) {
    query += `
    AND date >= $${index}
  `;

    values.push(startDate);
    index++;
  }

  if (endDate) {
    query += `
    AND date <= $${index}
  `;

    values.push(endDate);
    index++;
  }

  const allowedSortFields = {
    date: "date",
    amount: "amount",
    title: "title",
    category: "category",
  };

  const sortColumn = allowedSortFields[sortBy] || "date";

  const order = sortOrder === "asc" ? "ASC" : "DESC";

  query += `
ORDER BY ${sortColumn} ${order}, created_at DESC
LIMIT $${index}
OFFSET $${index + 1}
`;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(query, values);

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
      deleted,
      recurring_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
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
      expense.recurringId || null,
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

async function updateLastGeneratedDateQuery(id, lastGeneratedDate) {
  const result = await pool.query(
    `
    UPDATE expenses
    SET last_generated_date = $1
    WHERE id = $2
    RETURNING *
    `,
    [lastGeneratedDate, id],
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

async function getRecurringExpensesQuery() {
  const result = await pool.query(`
    SELECT *
FROM expenses
WHERE recurring != 'none'
AND deleted = false;
    `);

  return result.rows.map(mapExpenseFromDatabase);
}

async function getExpensesCountQuery(filters) {
  const { search, month, startDate, endDate } = filters;

  let query = `
    SELECT COUNT(*)
    FROM expenses
    WHERE deleted = false
  `;

  const values = [];
  let index = 1;

  if (search) {
    query += `
      AND (
        title ILIKE $${index}
        OR category ILIKE $${index}
        OR CAST(amount AS TEXT) ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;
  }

  if (month) {
    query += `
    AND EXTRACT(MONTH FROM date) = $${index}
  `;

    values.push(Number(month));
    index++;
  }

  if (startDate) {
    query += `
    AND date >= $${index}
  `;

    values.push(startDate);
    index++;
  }

  if (endDate) {
    query += `
    AND date <= $${index}
  `;

    values.push(endDate);
    index++;
  }

  const result = await pool.query(query, values);

  return Number(result.rows[0].count);
}

module.exports = {
  getAllExpenses,
  createExpenseQuery,
  updateExpenseQuery,
  updateLastGeneratedDateQuery,
  deleteExpenseQuery,
  restoreExpenseQuery,
  clearAllExpensesQuery,
  getRecurringExpensesQuery,
  getExpensesCountQuery,
};
