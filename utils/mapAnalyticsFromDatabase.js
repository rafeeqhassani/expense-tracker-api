function mapAnalyticsFromDatabase(data) {
  return {
    overall: {
      totalAmount: Number(data.total_amount),
      totalRecords: Number(data.total_records),
      averageExpense: Number(data.average_expense),
      highestExpense: Number(data.highest_expense),
      lowestExpense: Number(data.lowest_expense),
      averageDailySpending: Number(data.average_daily_spending),
    },

    filtered: {
      totalAmount: Number(data.month_total_amount),
      totalRecords: Number(data.month_total_records),
      averageExpense: Number(data.month_average_expense),
      highestExpense: Number(data.month_highest_expense),
      lowestExpense: Number(data.month_lowest_expense),
      averageDailySpending: Number(data.month_average_daily_spending),
    },
  };
}

module.exports = mapAnalyticsFromDatabase;
