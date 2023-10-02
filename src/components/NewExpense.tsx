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

export function NewExpense() {
  const [selectedType, setSelectedType] = useState('other');

  function handleChange(event: SelectChangeEvent<string>) {
    setSelectedType(event.target.value);
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
          onChange={(e) => {
            if (parseInt(e.target.value) < 1) {
              e.target.value = '';
            }
          }}
          onKeyDown={(e) => {
            if (e.key === '-') {
              e.preventDefault();
            }
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Тип покупки</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedType}
            label="expense-type"
            onChange={handleChange}
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
        <Button variant="contained">Добавить</Button>
      </CardActions>
    </Card>
  );
}
