const pool = require("../db");
const mapExpenseFromDatabase = require("../../utils/mapExpenseFromDatabase");

const ALLOWED_SORT_FIELDS = {
  date: "date",
  amount: "amount",
  title: "title",
  category: "category",
};

/**
 * Builds the shared WHERE clause + parameter values used by both
 * getAllExpenses and getExpensesCountQuery, so filtering logic
 * only ever lives in one place.
 */
function buildExpenseFilterClause(filters) {
  const { search, month, startDate, endDate } = filters;

  const conditions = ["deleted = false"];
  const values = [];
  let paramIndex = 1;

  if (search) {
    conditions.push(`
      (
        title ILIKE $${paramIndex}
        OR category ILIKE $${paramIndex}
        OR CAST(amount AS TEXT) ILIKE $${paramIndex}
      )
    `);
    values.push(`%${search}%`);
    paramIndex++;
  }

  if (month) {
    conditions.push(`EXTRACT(MONTH FROM date) = $${paramIndex}`);
    values.push(Number(month));
    paramIndex++;
  }

  if (startDate) {
    conditions.push(`date >= $${paramIndex}`);
    values.push(startDate);
    paramIndex++;
  }

  if (endDate) {
    conditions.push(`date <= $${paramIndex}`);
    values.push(endDate);
    paramIndex++;
  }

  return {
    whereClause: `WHERE ${conditions.join(" AND ")}`,
    values,
    nextParamIndex: paramIndex,
  };
}

async function getAllExpenses(filters) {
  const { page, limit, sortBy, sortOrder } = filters;
  const offset = (page - 1) * limit;

  const { whereClause, values, nextParamIndex } =
    buildExpenseFilterClause(filters);

  const sortColumn = ALLOWED_SORT_FIELDS[sortBy] || "date";
  const sortDirection = sortOrder === "asc" ? "ASC" : "DESC";

  const query = `
    SELECT *
    FROM expenses
    ${whereClause}
    ORDER BY ${sortColumn} ${sortDirection}, created_at DESC
    LIMIT $${nextParamIndex}
    OFFSET $${nextParamIndex + 1}
  `;

  const queryValues = [...values, limit, offset];

  const result = await pool.query(query, queryValues);

  return result.rows.map(mapExpenseFromDatabase);
}

async function getExpensesCountQuery(filters) {
  const { whereClause, values } = buildExpenseFilterClause(filters);

  const query = `
    SELECT COUNT(*)
    FROM expenses
    ${whereClause}
  `;

  const result = await pool.query(query, values);

  return Number(result.rows[0].count);
}

async function createExpenseQuery(expense) {
  const query = `
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    expense.id,
    expense.title,
    expense.amount,
    expense.category,
    expense.date,
    expense.recurring,
    expense.lastGeneratedDate,
    expense.deleted,
    expense.recurringId || null,
  ];

  const result = await pool.query(query, values);

  return mapExpenseFromDatabase(result.rows[0]);
}

async function updateExpenseQuery(id, expense) {
  const query = `
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
  `;

  const values = [
    expense.title,
    expense.amount,
    expense.category,
    expense.date,
    expense.recurring,
    expense.lastGeneratedDate,
    id,
  ];

  const result = await pool.query(query, values);

  if (!result.rows[0]) return null;

  return mapExpenseFromDatabase(result.rows[0]);
}

async function updateLastGeneratedDateQuery(id, lastGeneratedDate) {
  const query = `
    UPDATE expenses
    SET last_generated_date = $1
    WHERE id = $2
    RETURNING *
  `;

  const result = await pool.query(query, [lastGeneratedDate, id]);

  if (!result.rows[0]) return null;

  return mapExpenseFromDatabase(result.rows[0]);
}

async function deleteExpenseQuery(id) {
  const query = `
    UPDATE expenses
    SET deleted = true
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  if (!result.rows[0]) return null;

  return mapExpenseFromDatabase(result.rows[0]);
}

async function restoreExpenseQuery(id) {
  const query = `
    UPDATE expenses
    SET deleted = false
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  if (!result.rows[0]) return null;

  return mapExpenseFromDatabase(result.rows[0]);
}

async function clearAllExpensesQuery() {
  const query = `
    UPDATE expenses
    SET deleted = true
    RETURNING *
  `;

  const result = await pool.query(query);

  return result.rows.map(mapExpenseFromDatabase);
}

async function getRecurringExpensesQuery() {
  const query = `
    SELECT *
    FROM expenses
    WHERE recurring != 'none'
      AND deleted = false
  `;

  const result = await pool.query(query);

  return result.rows.map(mapExpenseFromDatabase);
}

async function deleteSelectedExpenses(ids) {
  const query = `
    UPDATE expenses
    SET deleted = true
    WHERE id = ANY($1)
    RETURNING *
  `;

  const result = await pool.query(query, [ids]);

  return result.rows.map(mapExpenseFromDatabase);
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
  deleteSelectedExpenses,
};
