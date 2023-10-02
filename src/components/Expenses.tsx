import { useState, useEffect } from 'react';
import { Expense } from '../types/Expense';
import {
  addExpenseToDatabase,
  getLastMonthExpenses,
  removeExpenseFromDatabase,
} from '../utils/firebaseLogic';
import { ExpensesList } from './ExpensesList';
import { NewExpense } from './NewExpense';
import { TotalBrowser } from './TotalBrowser';

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  async function addExpenseHandler(expenseAmount: string, expenseType?: string) {
    if (!expenseAmount) return;
    console.log('Expense added!', expenseAmount, expenseType, Date.now());
    await addExpenseToDatabase(Date.now(), parseInt(expenseAmount), expenseType || 'other');
    const updatedExpenses = [
      ...expenses,
      {
        timestamp: Date.now(),
        value: expenseAmount,
        type: expenseType || 'other',
      },
    ];
    setExpenses(updatedExpenses);
  }

  async function removeExpenseHandler(expenseTimestamp: number) {
    removeExpenseFromDatabase(expenseTimestamp);
    const updatedExpenses = expenses.filter((expense) => expense.timestamp !== expenseTimestamp);
    setExpenses(updatedExpenses);
  }

  async function fetchExpenses() {
    const expenses = await getLastMonthExpenses();
    setExpenses(expenses);
    console.log('ExpensesList updated successfully!');
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expenses-container">
      <NewExpense addExpenseHandler={addExpenseHandler}></NewExpense>
      <TotalBrowser expenses={expenses}></TotalBrowser>
      <ExpensesList expenses={expenses} removeExpenseHandler={removeExpenseHandler}></ExpensesList>
    </div>
  );
}
