import React, { memo, useState } from 'react';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { NewExpense } from '../components/NewExpense/NewExprense';
import { ResultTable } from '../components/ResultTable/ResultTable';
import { Expense } from '../api/types';
import { dateExtractor } from '../utils/dateExtractor';

export interface DateRange {
  from: Date;
  to: Date;
}

const defaultDateRange: DateRange = {
  from: dateExtractor.getFirstDayOfMonth(),
  to: new Date(),
};

export const Root: React.FC = memo(() => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 pt-5">
      <NewExpense expenses={expenses} setExpenses={setExpenses}></NewExpense>
      <DatePicker setDateRange={setDateRange}></DatePicker>
      <ResultTable dateRange={dateRange} setExpenses={setExpenses} expenses={expenses}></ResultTable>
    </div>
  );
});
