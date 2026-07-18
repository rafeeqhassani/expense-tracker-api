function normalizeExpenseData(data, existingId = null) {
  const parsedAmount = Number(String(data.amount).trim());
  const isValidDate = data.date && !isNaN(Date.parse(data.date));

  return {
    id: existingId || crypto.randomUUID(),
    title: data.title.trim(),
    amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
    category: data.category.trim().toLowerCase(),
    date: isValidDate ? data.date : new Date().toISOString().split("T")[0],
    recurring: data.recurring ?? "none",
    lastGeneratedDate: data.lastGeneratedDate ?? "",
    recurringId: data.recurringId ?? null,
    deleted: false,
  };
}

module.exports = normalizeExpenseData;
