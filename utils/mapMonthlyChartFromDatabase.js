function mapMonthlyChartFromDatabase(data) {
  if (!data) return null;

  return {
    month: data.month,
    total: Number(data.total),
  };
}

module.exports = mapMonthlyChartFromDatabase;
