function mapExpenseFromDatabase(expense) {
  return {
    id: expense.id,
    title: expense.title,
    amount: Number(expense.amount),
    category: expense.category,
    date: expense.date.toISOString().split("T")[0],
    recurring: expense.recurring ?? "none",
    lastGeneratedDate: expense.last_generated_date ?? "",
    recurringId: expense.recurring_id ?? null,
    deleted: expense.deleted,
  };
}

module.exports = mapExpenseFromDatabase;
