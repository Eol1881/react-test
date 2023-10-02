import { useEffect, useState } from 'react';
import { getLastMonthExpenses } from '../utils/firebaseLogic';
import { getExpenceIcon } from '../utils/getExpenceIcon';
import { getFormattedDate } from '../utils/getFormattedDate';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  interface Expense {
    timeStamp: number;
    type: string;
    value: string;
  }

  const updateExpenses = async () => {
    const expenses = await getLastMonthExpenses();
    setExpenses(expenses);
    console.log('Expenses updated successfully!');
  };

  useEffect(() => {
    updateExpenses();
  }, []);

  return (
    <Card sx={{ maxWidth: 320, textAlign: 'left', mb: 5 }}>
      <List>
        {expenses.map((expense) => {
          const labelId = `expense-label-${expense.timeStamp}`;

          return (
            <ListItem
              key={expense.timeStamp}
              secondaryAction={
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              sx={{ pl: 1 }}
            >
              <ListItemButton role={undefined} dense>
                <ListItemText id={labelId} primary={`${getExpenceIcon(expense.type)}`} />
                <ListItemText id={labelId} primary={`${expense.value} RUB`} />
                <ListItemText id={labelId} primary={`${getFormattedDate(expense.timeStamp)}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
