const {
  createExpenseQuery,
  updateLastGeneratedDateQuery,
  getRecurringExpensesQuery,
} = require("../db/queries/expenseQueries");

const STEP_ADDERS = {
  daily: (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  },

  weekly: (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate;
  },

  monthly: (date) => {
    const nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    return nextDate;
  },

  yearly: (date) => {
    const nextDate = new Date(date);
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    return nextDate;
  },
};

function addStep(date, recurringType) {
  const stepAdder = STEP_ADDERS[recurringType];

  if (!stepAdder) {
    throw new Error(`Invalid recurring type: ${recurringType}`);
  }

  return stepAdder(date);
}

function generateMissingDates(currentDate, lastRunDate, recurringType) {
  const current = new Date(currentDate.toISOString().split("T")[0]);

  let lastRun = new Date(lastRunDate.toISOString().split("T")[0]);

  const missingDates = [];

  while (lastRun < current) {
    const nextDate = addStep(lastRun, recurringType);

    if (nextDate.getTime() === lastRun.getTime()) {
      break;
    }

    lastRun = nextDate;
    missingDates.push(new Date(lastRun));
  }

  return missingDates;
}

const crypto = require("crypto");

function createGeneratedExpense(expense, date) {
  return {
    id: crypto.randomUUID(),
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: date.toISOString().split("T")[0],
    recurring: "none",
    lastGeneratedDate: "",
    recurringId: expense.id,
    deleted: false,
  };
}

async function processRecurringExpenses() {
  const today = new Date();

  const recurringExpenses = await getRecurringExpensesQuery();

  let generatedCount = 0;

  for (const expense of recurringExpenses) {
    const missingDates = generateMissingDates(
      today,
      new Date(expense.lastGeneratedDate),
      expense.recurring,
    );

    if (missingDates.length === 0) {
      continue;
    }

    for (const missingDate of missingDates) {
      const generatedExpense = createGeneratedExpense(expense, missingDate);

      await createExpenseQuery(generatedExpense);

      generatedCount++;
    }

    const lastGeneratedDate = missingDates[missingDates.length - 1]
      .toISOString()
      .split("T")[0];

    await updateLastGeneratedDateQuery(expense.id, lastGeneratedDate);
  }

  return generatedCount;
}

module.exports = {
  processRecurringExpenses,
};
