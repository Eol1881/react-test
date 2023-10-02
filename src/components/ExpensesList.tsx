import { getExpenceIcon } from '../utils/getExpenceIcon';
import { getFormattedDate } from '../utils/getFormattedDate';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import { Expense } from '../types/Expense';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const ExpensesList = ({
  expenses,
  removeExpenseHandler,
}: {
  expenses: Expense[];
  removeExpenseHandler: (expenseTimestamp: number) => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpenseTimestamp, setSelectedExpenseTimestamp] = useState(0);

  return (
    <Card sx={{ maxWidth: 320, textAlign: 'left', mb: 5 }}>
      <List>
        {expenses.map((expense: Expense) => {
          const labelId = `expense-label-${expense.timestamp}`;
          return (
            <ListItem
              key={expense.timestamp}
              secondaryAction={
                <IconButton
                  onClick={() => {
                    setOpenDialog(true);
                    setSelectedExpenseTimestamp(expense.timestamp);
                    // removeExpenseHandler(expense.timestamp);
                  }}
                  sx={{ ':focus': { outline: 'none' } }}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              sx={{ pl: 1 }}
            >
              <ListItemButton role={undefined} dense>
                <ListItemText id={labelId} primary={`${getExpenceIcon(expense.type)}`} />
                <ListItemText id={labelId} primary={`${expense.value} RUB`} />
                <ListItemText id={labelId} primary={`${getFormattedDate(expense.timestamp)}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle>Удалить покупку</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы уверены, что хотите удалить покупку?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            color="primary"
            sx={{ ':focus': { outline: 'none' } }}
          >
            Отменить
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              removeExpenseHandler(selectedExpenseTimestamp);
            }}
            color="error"
            sx={{ ':focus': { outline: 'none' } }}
            autoFocus
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
