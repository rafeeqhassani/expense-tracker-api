function mapChartsFromDatabase(data) {
  return {
    category: data.category,
    total: Number(data.total),
  };
}

module.exports = mapChartsFromDatabase;
