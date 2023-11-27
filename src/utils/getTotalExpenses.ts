import { Expense } from '../api/types';
import { TotalExpenses } from '../routes/Root';

export const getTotalExpenses = (expenses: Expense[]) => {
  const totalExpenses = expenses.reduce((acc: TotalExpenses, item: Expense) => {
    if (acc[item.type]) {
      acc[item.type] = parseInt(item.value) + acc[item.type];
    } else {
      acc[item.type] = parseInt(item.value);
    }
    return acc;
  }, {});

  return totalExpenses;
};
