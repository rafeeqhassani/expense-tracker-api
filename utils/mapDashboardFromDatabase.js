function mapDashboardFromDatabase(data) {
  return {
    expensesToday: Number(data.expenses_today),
    expensesThisWeek: Number(data.expenses_this_week),
    expensesThisMonth: Number(data.expenses_this_month),
    expensesThisYear: Number(data.expenses_this_year),
    totalCategories: Number(data.total_categories),
  };
}

module.exports = mapDashboardFromDatabase;
