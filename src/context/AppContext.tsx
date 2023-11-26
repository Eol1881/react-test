import { Dispatch, ReactNode, createContext, useState } from 'react';
import { dateExtractor } from '../utils/dateExtractor';
import { Expense } from '../api/types';

export interface DateRange {
  from: Date;
  to: Date;
}

export const defaultDateRange: DateRange = {
  from: dateExtractor.getFirstDayOfMonth(),
  to: new Date(),
};

export const defaultAppContextValue = {
  dateRange: defaultDateRange,
  setDateRange: () => {},
  expenses: [],
  setExpenses: () => {},
};

export interface IAppContext {
  dateRange: DateRange;
  setDateRange: Dispatch<React.SetStateAction<DateRange>>;
  expenses: Expense[];
  setExpenses: Dispatch<React.SetStateAction<Expense[]>>;
}

export const AppContext = createContext<IAppContext>({
  dateRange: defaultDateRange,
  setDateRange: () => {},
  expenses: [],
  setExpenses: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <AppContext.Provider value={{ dateRange, setDateRange, expenses, setExpenses }}>{children}</AppContext.Provider>
  );
};
