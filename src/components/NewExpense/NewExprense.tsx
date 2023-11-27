import { Card, Metric, NumberInput, Button } from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { ExpenseSelect } from './ExpenseSelect';
import { useState } from 'react';
import { ExpenseType } from '../../constants/expensesMap';
import { addExpenseToDatabase } from '../../api/firebase';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { Expense } from '../../api/types';

interface Props {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export const NewExpense: React.FC<Props> = ({ expenses, setExpenses }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState<number>(0);
  const [expenseType, setExpenseType] = useState<ExpenseType>('other');

  async function addExpenseHandler() {
    if (!value) return;
    setExpenseType('other');
    setValue(0);
    await addExpenseToDatabase(Date.now(), value, expenseType || 'other');
    const updatedExpenses = [
      ...expenses,
      {
        timestamp: Date.now(),
        value: value.toString(),
        type: expenseType || 'other',
      },
    ];
    setExpenses(updatedExpenses);
  }

  const toHistoryHandler = () => {
    navigate('/history');
  };

  return (
    <Card className="mx-auto max-w-xs space-y-4 ring-transparent" decoration="top" decorationColor="indigo">
      <Metric>Новая покупка</Metric>
      <NumberInput icon={CurrencyDollarIcon} value={value} onValueChange={setValue} placeholder="Потречено" />
      <ExpenseSelect expenseTypeChangeHandler={setExpenseType}></ExpenseSelect>
      <div className="flex justify-between">
        <Button onClick={addExpenseHandler}>Добавить</Button>
        <Button iconPosition="right" icon={ArrowRightIcon} variant="secondary" onClick={toHistoryHandler}>
          История
        </Button>
      </div>
    </Card>
  );
};
