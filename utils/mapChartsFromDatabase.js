function mapChartsFromDatabase(data) {
  if (!data) return null;

  return {
    category: data.category,
    total: Number(data.total),
  };
}

module.exports = mapChartsFromDatabase;
