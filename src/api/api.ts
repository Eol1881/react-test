import { getExpensesInTimeRange } from './firebase';

export async function fetchExpenses(from: Date, to: Date) {
  const expenses = await getExpensesInTimeRange(from, to);
  return expenses;
}
