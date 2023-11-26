import { Card, Metric, NumberInput, Button } from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { ExpenseSelect } from './ExpenseSelect';
import { useContext, useState } from 'react';
import { ExpenseType } from '../../constants/expensesMap';
import { addExpenseToDatabase } from '../../api/firebase';
import { AppContext } from '../../context/AppContext';

export const NewExpense = () => {
  const [value, setValue] = useState<number>(0);
  const [expenseType, setExpenseType] = useState<ExpenseType>('other');

  const { expenses, setExpenses } = useContext(AppContext);

  async function addExpenseHandler(expenseAmount: string, expenseType?: string) {
    if (!expenseAmount) return;
    await addExpenseToDatabase(Date.now(), parseInt(expenseAmount), expenseType || 'other');
    const updatedExpenses = [
      ...expenses,
      {
        timestamp: Date.now(),
        value: expenseAmount,
        type: expenseType || 'other',
      },
    ];
    setExpenses(updatedExpenses);
  }

  const addNewExpense = () => {
    if (typeof value?.toString() === 'string') addExpenseHandler(value?.toString(), expenseType);
    setExpenseType('other');
    setValue(0);
  };

  return (
    <Card className="mx-auto max-w-xs space-y-4 ring-transparent" decoration="top" decorationColor="indigo">
      <Metric>Новая покупка</Metric>
      <NumberInput icon={CurrencyDollarIcon} value={value} onValueChange={setValue} placeholder="Потречено" />
      <ExpenseSelect expenseTypeChangeHandler={setExpenseType}></ExpenseSelect>
      <Button onClick={addNewExpense}>Добавить</Button>
    </Card>
  );
};
