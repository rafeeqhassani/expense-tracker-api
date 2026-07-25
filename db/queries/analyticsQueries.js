const pool = require("../db");
const mapAnalyticsFromDatabase = require("../../utils/mapAnalyticsFromDatabase");
const mapDashboardFromDatabase = require("../../utils/mapDashboardFromDatabase");
const mapChartsFromDatabase = require("../../utils/mapChartsFromDatabase");
const mapMonthlyChartFromDatabase = require("../../utils/mapMonthlyChartFromDatabase");

async function getAnalyticsSummary(userId) {
  const query = `
    SELECT
      -- Overall
      COALESCE(SUM(amount), 0) AS total_amount,
      COUNT(*) AS total_records,
      COALESCE(AVG(amount), 0) AS average_expense,
      COALESCE(MAX(amount), 0) AS highest_expense,
      COALESCE(MIN(amount), 0) AS lowest_expense,
      COALESCE(
        SUM(amount) / NULLIF((CURRENT_DATE - MIN(date::date)) + 1, 0),
        0
      ) AS average_daily_spending,

      -- This month
      COALESCE(
        SUM(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE)),
        0
      ) AS month_total_amount,

      COUNT(*) FILTER (
        WHERE date >= date_trunc('month', CURRENT_DATE)
      ) AS month_total_records,

      COALESCE(
        AVG(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE)),
        0
      ) AS month_average_expense,

      COALESCE(
        MAX(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE)),
        0
      ) AS month_highest_expense,

      COALESCE(
        MIN(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE)),
        0
      ) AS month_lowest_expense,

      COALESCE(
        SUM(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE))
          / NULLIF(EXTRACT(DAY FROM CURRENT_DATE), 0),
        0
      ) AS month_average_daily_spending

    FROM expenses
    WHERE user_id = $1
    AND deleted = false
  `;

  const result = await pool.query(query, [userId]);

  return mapAnalyticsFromDatabase(result.rows[0]);
}

async function getDashboardStats(userId) {
  const query = `
    SELECT
      COALESCE(
        SUM(amount) FILTER (WHERE date::date = CURRENT_DATE),
        0
      ) AS expenses_today,

      COALESCE(
        SUM(amount) FILTER (WHERE date >= CURRENT_DATE - INTERVAL '7 days'),
        0
      ) AS expenses_this_week,

      COALESCE(
        SUM(amount) FILTER (WHERE date >= date_trunc('month', CURRENT_DATE)),
        0
      ) AS expenses_this_month,

      COALESCE(
        SUM(amount) FILTER (WHERE date >= date_trunc('year', CURRENT_DATE)),
        0
      ) AS expenses_this_year,

      COUNT(DISTINCT category) AS total_categories

    FROM expenses
    WHERE user_id = $1
    AND deleted = false
  `;

  const result = await pool.query(query, [userId]);

  return mapDashboardFromDatabase(result.rows[0]);
}

async function getCategoryChartData(userId) {
  const query = `
    WITH category_totals AS (
      SELECT
        category,
        SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
      AND deleted = false
      AND date <= CURRENT_DATE
      GROUP BY category
      ORDER BY total DESC
    ),

    top_categories AS (
      SELECT *
      FROM category_totals
      ORDER BY total DESC
      LIMIT 5
    ),

    other_categories AS (
      SELECT
        'Others' AS category,
        SUM(total) AS total
      FROM (
        SELECT *
        FROM category_totals
        ORDER BY total DESC
        OFFSET 5
      ) AS remaining_categories
    )

    SELECT * FROM top_categories
    UNION ALL
    SELECT * FROM other_categories
    WHERE total IS NOT NULL
  `;

  const result = await pool.query(query, [userId]);

  return result.rows.map(mapChartsFromDatabase);
}

async function getMonthlyChartData(userId) {
  const query = `
    SELECT
      TO_CHAR(months.month, 'Mon YYYY') AS month,
      COALESCE(SUM(expenses.amount), 0) AS total
    FROM generate_series(
      date_trunc('month', CURRENT_DATE) - INTERVAL '5 months',
      date_trunc('month', CURRENT_DATE),
      INTERVAL '1 month'
    ) AS months(month)
    LEFT JOIN expenses
      ON date_trunc('month', expenses.date) = months.month
      WHERE expenses.user_id = $1
      AND expenses.deleted = false
      AND expenses.date <= CURRENT_DATE
    GROUP BY months.month
    ORDER BY months.month
  `;

  const result = await pool.query(query, [userId]);

  return result.rows.map(mapMonthlyChartFromDatabase);
}

async function getChartData(userId) {
  const [category, monthly] = await Promise.all([
    getCategoryChartData(userId),
    getMonthlyChartData(userId),
  ]);

  return { category, monthly };
}

module.exports = {
  getAnalyticsSummary,
  getDashboardStats,
  getChartData,
};
