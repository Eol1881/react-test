import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';

import { addExpense } from '../utils/firebaseLogic';

export function NewExpense() {
  const [expenseType, setExpenseType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  function handleExpenseTypeChange(event: SelectChangeEvent<string>) {
    setExpenseType(event.target.value);
  }

  async function handleAddExpenseButtonClick() {
    console.log(expenseAmount, expenseType, Date.now());
    if (!expenseAmount) return;
    await addExpense(Date.now(), parseInt(expenseAmount), expenseType || 'other');
  }

  function handleExpenseInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (parseInt(event.target.value) < 1) event.target.value = '';
    setExpenseAmount(event.target.value);
  }

  function handleExpenseInputKeydown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === '-') event.preventDefault();
  }

  return (
    <Card sx={{ maxWidth: 320, textAlign: 'left', mb: 5 }}>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          Новая покупка
        </Typography>
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          id="outlined-basic"
          label="Потрачено"
          variant="outlined"
          type="number"
          onChange={handleExpenseInputChange}
          onKeyDown={handleExpenseInputKeydown}
        />
        <FormControl fullWidth>
          <InputLabel id="expense-type-select-label">Тип покупки</InputLabel>
          <Select
            labelId="expense-type-select-label"
            id="expense-type-select"
            value={expenseType}
            label="expense-type"
            onChange={handleExpenseTypeChange}
          >
            <MenuItem value={'food'}>🍔 Еда</MenuItem>
            <MenuItem value={'smoke'}>🚬 Табак</MenuItem>
            <MenuItem value={'fun'}>🎉 Развлечения</MenuItem>
            <MenuItem value={'repairs'}>🔧 Ремонт</MenuItem>
            <MenuItem value={'upgrades'}>📱 Апгрейды</MenuItem>
            <MenuItem value={'other'}>✨ Другое</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button variant="contained" onClick={handleAddExpenseButtonClick}>
          Добавить
        </Button>
      </CardActions>
    </Card>
  );
}
