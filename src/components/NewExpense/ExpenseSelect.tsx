import { CalculatorIcon } from '@heroicons/react/outline';
import { Select, SelectItem } from '@tremor/react';
import { useState } from 'react';
import { EXPENSES_MAP } from '../../constants/expensesMap';

interface Props {
  expenseTypeChangeHandler: (expenseType: string) => void;
}

export const ExpenseSelect: React.FC<Props> = ({ expenseTypeChangeHandler }) => {
  const [value, setValue] = useState('');

  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>(undefined);

  const updateActiveItem = (activeItemIndex: number, expenseType: string) => {
    setActiveItemIndex(activeItemIndex);
    expenseTypeChangeHandler(expenseType);
  };

  return (
    <>
      <div className="mx-auto max-w-sm space-y-6">
        <Select
          value={value}
          onValueChange={setValue}
          placeholder="Тип покупки"
          icon={typeof activeItemIndex === 'number' ? EXPENSES_MAP[activeItemIndex].icon : CalculatorIcon}
          enableClear={false}
        >
          {EXPENSES_MAP.map((expense, expenseIndex) => (
            <SelectItem
              key={expense.type}
              onClick={() => updateActiveItem(expenseIndex, expense.type)}
              value={expense.type}
              icon={expense.icon}
            >
              {expense.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
};
