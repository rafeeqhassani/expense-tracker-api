function mapMonthlyChartFromDatabase(data) {
  return {
    month: data.month,
    total: Number(data.total),
  };
}

module.exports = mapMonthlyChartFromDatabase;
