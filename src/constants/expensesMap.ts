import * as icons from '../assets/icon-components/iconComponents';

export const EXPENSES_MAP = [
  {
    type: 'food',
    icon: icons.IconFood,
    label: 'Еда',
  },
  {
    type: 'smoke',
    icon: icons.IconSmoke,
    label: 'Табак',
  },
  {
    type: 'household',
    icon: icons.IconHousehold,
    label: 'Бытовые расходы',
  },
  {
    type: 'medicine',
    icon: icons.IconMedicine,
    label: 'Медицина',
  },
  {
    type: 'fun',
    icon: icons.IconFun,
    label: 'Развлечения',
  },
  {
    type: 'repairs',
    icon: icons.IconRepairs,
    label: 'Ремонт',
  },
  {
    type: 'upgrades',
    icon: icons.IconUpgrades,
    label: 'Апгрейды',
  },
  {
    type: 'subscriptions',
    icon: icons.IconSubscriptions,
    label: 'Интернет и связь',
  },
  {
    type: 'clothing',
    icon: icons.IconClothing,
    label: 'Одежда',
  },
  {
    type: 'other',
    icon: icons.IconOther,
    label: 'Другое',
  },
];

export type ExpenseType = (typeof EXPENSES_MAP)[number]['type'];
