import { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, Bold, TableRow, Text, Title } from '@tremor/react';
import { EXPENSES_MAP } from '../../constants/expensesMap';
import { Expense } from '../../api/types';
import { fetchExpenses } from '../../api/api';
import { DateRange } from '../../routes/Root';
import { TotalChart } from '../TotalChart/TotalChart';

type TotalExpenses = {
  [key: string]: number;
};

interface Props {
  dateRange: DateRange;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  expenses: Expense[];
}

export const ResultTable: React.FC<Props> = ({ expenses, setExpenses, dateRange }) => {
  const [totalExpenses, setTotalExpenses] = useState<TotalExpenses>({});
  const [summary, setSummary] = useState<number>(0);

  const { from, to } = dateRange;

  useEffect(() => {
    const updateExpenses = async () => {
      const expenses = await fetchExpenses(from, to);
      setExpenses(expenses);
      const totalExpenses = expenses.reduce((acc: TotalExpenses, item: Expense) => {
        if (acc[item.type]) {
          acc[item.type] = parseInt(item.value) + acc[item.type];
        } else {
          acc[item.type] = parseInt(item.value);
        }
        return acc;
      }, {});
      setTotalExpenses(totalExpenses);
      const summary = Object.values(totalExpenses).reduce((acc: number, item: number) => acc + item, 0);
      setSummary(summary);
    };

    updateExpenses();
  }, [from, to, setExpenses]);

  useEffect(() => {
    const totalExpenses = expenses.reduce((acc: TotalExpenses, item: Expense) => {
      if (acc[item.type]) {
        acc[item.type] = parseInt(item.value) + acc[item.type];
      } else {
        acc[item.type] = parseInt(item.value);
      }
      return acc;
    }, {});
    setTotalExpenses(totalExpenses);
    const summary = Object.values(totalExpenses).reduce((acc: number, item: number) => acc + item, 0);
    setSummary(summary);
  }, [expenses]);

  return (
    <Card className="mx-auto mt-6 max-w-xs p-4">
      <Title>Затраты за выбранный период</Title>
      <Table className="mt-5">
        <TableBody>
          {Object.entries(totalExpenses).map(([expenseType, expenseValue]) => (
            <TableRow key={expenseType}>
              <TableCell>
                {EXPENSES_MAP.find((expense) => {
                  if (expense.type === expenseType) return expense;
                })?.icon()}
              </TableCell>
              <TableCell className="px-0">
                <Text>
                  {
                    EXPENSES_MAP.find((expense) => {
                      if (expense.type === expenseType) return expense;
                    })?.label
                  }
                </Text>
              </TableCell>
              <TableCell>
                <Text>
                  <Bold>{expenseValue} RUB</Bold>
                </Text>
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="p-0">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Bold className="text-black">{summary} RUB</Bold>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TotalChart expenses={expenses}></TotalChart>
    </Card>
  );
};
