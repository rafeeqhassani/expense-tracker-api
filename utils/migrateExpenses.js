function migrateExpenses(expenses) {
  let changed = false;

  const migratedExpenses = expenses.map((expense) => {
    const migratedExpense = {
      ...expense,
      id: expense.id || crypto.randomUUID(),
      recurring: expense.recurring ?? "none",
      lastGeneratedDate: expense.lastGeneratedDate ?? "",
      deleted: expense.deleted ?? false,
    };

    if (
      migratedExpense.id !== expense.id ||
      migratedExpense.recurring !== expense.recurring ||
      migratedExpense.lastGeneratedDate !== expense.lastGeneratedDate ||
      migratedExpense.deleted !== expense.deleted
    ) {
      changed = true;
    }

    return migratedExpense;
  });

  return {
    expenses: migratedExpenses,
    changed,
  };
}

module.exports = migrateExpenses;
