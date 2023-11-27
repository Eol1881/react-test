import { DonutChart } from '@tremor/react';

import { Expense } from '../../api/types';
import { getTotalExpenses } from '../../utils/getTotalExpenses';

interface Props {
  expenses: Expense[];
}

export const TotalChart: React.FC<Props> = ({ expenses }) => {
  const totalExpensesArray = Object.entries(getTotalExpenses(expenses)).map(([type, value]) => ({
    name: type,
    sales: value,
  }));

  const valueFormatter = (number: number) => `RUB ${new Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <DonutChart
      className="mt-6"
      data={totalExpensesArray}
      category="sales"
      index="name"
      valueFormatter={valueFormatter}
      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber', 'green']}
    />
  );
};
