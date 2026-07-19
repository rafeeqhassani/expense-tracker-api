function mapBudgetFromDatabase(budget) {
  if (!budget) return null;

  return {
    id: budget.id,
    userId: budget.user_id,

    monthlyLimit: Number(budget.monthly_limit),

    categoryLimits: budget.category_limits,

    createdAt: budget.created_at,
    updatedAt: budget.updated_at,
  };
}

module.exports = mapBudgetFromDatabase;
