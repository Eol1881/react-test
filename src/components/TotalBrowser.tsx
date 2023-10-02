import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Expense } from '../types/Expense';
import { getExpenceIcon } from '../utils/getExpenceIcon';
import { getExpenceLabel } from '../utils/getExpenseLabel';
// import { getExpenceIcon } from '../utils/getExpenceIcon';
// import { getFormattedDate } from '../utils/getFormattedDate';

export function TotalBrowser({ expenses }: { expenses: Expense[] }) {
  // const exspenseTypes = expenses.map((expense) => expense.type);
  // const uniqueExspenseTypes = [...new Set(exspenseTypes)];

  type TotalExpenses = {
    [key: string]: number;
  };

  const totalExpenses = expenses.reduce((acc: TotalExpenses, item: Expense) => {
    if (acc[item.type]) {
      acc[item.type] = parseInt(item.value) + acc[item.type];
    } else {
      acc[item.type] = parseInt(item.value);
    }
    return acc;
  }, {});

  return (
    <Card sx={{ maxWidth: 320, textAlign: 'left', mb: 5 }}>
      <List>
        {Object.entries(totalExpenses).map(([expenseType, expenseValue]) => {
          return (
            <ListItem key={expenseType} disablePadding sx={{ pl: 2, display: 'flex' }}>
              <ListItemText
                sx={{ width: 30, flex: 'none', display: 'flex', justifyContent: 'center' }}
                id={expenseType}
                primary={`${getExpenceIcon(expenseType)}`}
              />
              <ListItemText
                sx={{ textAlign: 'left' }}
                id={expenseType}
                primary={`${getExpenceLabel(expenseType)}`}
              />
              <ListItemText
                sx={{ textAlign: 'right', pr: 4 }}
                id={expenseType}
                primary={`${expenseValue} RUB`}
                primaryTypographyProps={{ fontWeight: '500' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
