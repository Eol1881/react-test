export function getExpenceIcon(expenseType: string) {
  let icon;
  switch (expenseType) {
    case 'food':
      icon = '🍔';
      break;
    case 'smoke':
      icon = '🚬';
      break;
    case 'fun':
      icon = ' 🎉';
      break;
    case 'repairs':
      icon = '🔧';
      break;
    case 'upgrades':
      icon = '📱';
      break;
    case 'other':
      icon = '✨';
      break;
    default:
      icon = '❓';
      break;
  }
  return icon;
}
