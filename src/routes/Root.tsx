import React, { memo } from 'react';
import { DateRange } from '../components/DatePicker/DatePicker';
import { NewExpense } from '../components/NewExpense/NewExprense';
import { ResultTable } from '../components/ResultTable/ResultTable';

export const Root: React.FC = memo(() => {
  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 pt-5">
      <NewExpense></NewExpense>
      <DateRange></DateRange>
      <ResultTable></ResultTable>
    </div>
  );
});
