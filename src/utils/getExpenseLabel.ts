export function getExpenceLabel(expenseType: string) {
  let label;
  switch (expenseType) {
    case 'food':
      label = 'Еда';
      break;
    case 'smoke':
      label = 'Табак';
      break;
    case 'fun':
      label = ' Развлечения';
      break;
    case 'repairs':
      label = 'Ремонт';
      break;
    case 'upgrades':
      label = 'Апгрейды';
      break;
    case 'other':
      label = 'Другое';
      break;
    case 'medicine':
      label = 'Здоровье';
      break;
    default:
      label = 'ошибка';
      break;
  }
  return label;
}
