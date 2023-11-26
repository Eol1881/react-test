export interface Expense {
  timestamp: number;
  type: string;
  value: string;
}

export type getExpensesResponse = Expense[];
