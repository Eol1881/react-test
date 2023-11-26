import { Bold, Button } from '@tremor/react';
import { EXPENSES_MAP } from '../../constants/expensesMap';

import { ListItem } from '@tremor/react';
import { getFormattedDate } from '../../utils/getFormattedDate';

import { Icon } from '@tremor/react';
import { TrashIcon } from '@heroicons/react/outline';
import { Expense } from '../../api/types';
import { removeExpenseFromDatabase } from '../../api/firebase';
import { useState } from 'react';

interface Props {
  expenseData: Expense;
  thisMonthHistory: Expense[];
  setThisMonthHistory: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export const HistoryItem: React.FC<Props> = ({ expenseData, thisMonthHistory, setThisMonthHistory }) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsConfirmationDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    setThisMonthHistory(
      thisMonthHistory.filter((expense) => {
        return expense.timestamp !== expenseData.timestamp;
      })
    );
    removeExpenseFromDatabase(expenseData.timestamp);
    setIsConfirmationDialogOpen(false);
  };

  const handleRemoveCancel = () => {
    setIsConfirmationDialogOpen(false);
  };

  return isConfirmationDialogOpen ? (
    <ListItem key={expenseData.timestamp} className="h-11">
      Удалить эту покупку?
      <Button variant="light" onClick={handleRemoveConfirm} color="red">
        Да
      </Button>
      <Button variant="light" onClick={handleRemoveCancel} className="pr-2">
        Нет
      </Button>
    </ListItem>
  ) : (
    <ListItem key={expenseData.timestamp} className="relative h-11 justify-between">
      <div className="flex">
        <div className="w-8">
          {EXPENSES_MAP.find((expense) => {
            if (expense.type === expenseData.type) return expense;
          })?.icon()}
        </div>
        <Bold>{expenseData.value}</Bold>
      </div>

      <div className="flex w-1/2 items-center justify-between">
        {getFormattedDate(expenseData.timestamp)}
        <Icon icon={TrashIcon} color="stone" className="cursor-pointer" onClick={handleOpenDialog} />
      </div>
    </ListItem>
  );
};
