const crypto = require("crypto");

const {
  createExpenseQuery,
  updateLastGeneratedDateQuery,
  getRecurringExpensesQuery,
} = require("../db/queries/expenseQueries");

/**
 * Maps a recurring type to a function that advances a given date
 * by one occurrence of that type.
 */
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

/**
 * Advances `date` by one occurrence of `recurringType`
 * (e.g. one day, one week, one month, one year).
 *
 * @throws {Error} If `recurringType` is not a recognized recurring type.
 */
function addStep(date, recurringType) {
  const stepAdder = STEP_ADDERS[recurringType];

  if (!stepAdder) {
    throw new Error(`Invalid recurring type: ${recurringType}`);
  }

  return stepAdder(date);
}

/**
 * Strips the time component from a date, returning midnight UTC
 * for that calendar day.
 */
function toDateOnly(date) {
  return new Date(date.toISOString().split("T")[0]);
}

/**
 * Computes every occurrence date that should have been generated
 * between `lastRunDate` (exclusive) and `currentDate` (exclusive),
 * stepping forward according to `recurringType`.
 *
 * @returns {Date[]} Dates in chronological order; empty if none are due.
 */
function generateMissingDates(currentDate, lastRunDate, recurringType) {
  const current = toDateOnly(currentDate);
  let lastRun = toDateOnly(lastRunDate);

  const missingDates = [];

  while (lastRun < current) {
    const nextDate = addStep(lastRun, recurringType);

    // Safety net: if a step ever fails to advance the date,
    // stop instead of looping forever.
    if (nextDate.getTime() === lastRun.getTime()) {
      break;
    }

    lastRun = nextDate;
    missingDates.push(new Date(lastRun));
  }

  return missingDates;
}

/**
 * Builds a new one-off expense record generated from a recurring
 * expense template, dated `occurrenceDate`.
 */
function createGeneratedExpense(recurringExpense, occurrenceDate) {
  return {
    id: crypto.randomUUID(),
    title: recurringExpense.title,
    amount: recurringExpense.amount,
    category: recurringExpense.category,
    date: occurrenceDate.toISOString().split("T")[0],
    recurring: "none",
    lastGeneratedDate: "",
    recurringId: recurringExpense.id,
    deleted: false,
  };
}

/**
 * Generates and persists any expense occurrences that are due for a
 * single recurring expense, then advances its `lastGeneratedDate`.
 *
 * @returns {Promise<number>} The number of expenses generated.
 */
async function processRecurringExpense(recurringExpense, today) {
  const missingDates = generateMissingDates(
    today,
    new Date(recurringExpense.lastGeneratedDate),
    recurringExpense.recurring,
  );

  if (missingDates.length === 0) {
    return 0;
  }

  for (const occurrenceDate of missingDates) {
    const generatedExpense = createGeneratedExpense(
      recurringExpense,
      occurrenceDate,
    );
    await createExpenseQuery(generatedExpense);
  }

  const latestGeneratedDate = missingDates[missingDates.length - 1]
    .toISOString()
    .split("T")[0];

  await updateLastGeneratedDateQuery(recurringExpense.id, latestGeneratedDate);

  return missingDates.length;
}

/**
 * Finds all recurring expenses and generates any missing occurrences
 * up to today, persisting them and updating each expense's
 * last-generated date.
 *
 * @returns {Promise<number>} Total number of expenses generated.
 */
async function processRecurringExpenses() {
  const today = new Date();
  const recurringExpenses = await getRecurringExpensesQuery();

  let generatedCount = 0;

  for (const recurringExpense of recurringExpenses) {
    generatedCount += await processRecurringExpense(recurringExpense, today);
  }

  return generatedCount;
}

module.exports = {
  processRecurringExpenses,
};
