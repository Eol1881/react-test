import { useState, useEffect } from 'react';
import { Expense } from '../types/Expense';
import {
  addExpenseToDatabase,
  getLastMonthExpenses,
  removeExpenseFromDatabase,
} from '../utils/firebaseLogic';
import { ExpensesList } from './ExpensesList';
import { NewExpense } from './NewExpense';

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  async function addExpenseHandler(expenseAmount: string, expenseType?: string) {
    console.log('Expense added!', expenseAmount, expenseType, Date.now());
    if (!expenseAmount) return;
    await addExpenseToDatabase(Date.now(), parseInt(expenseAmount), expenseType || 'other');
    const updatedExpanses = [
      ...expenses,
      {
        timestamp: Date.now(),
        value: expenseAmount,
        type: expenseType || 'other',
      },
    ];
    setExpenses(updatedExpanses);
  }

  async function removeExpenseHandler(expenseTimestamp: number) {
    removeExpenseFromDatabase(expenseTimestamp);
    const updatedExpanses = expenses.filter((expense) => expense.timestamp !== expenseTimestamp);
    setExpenses(updatedExpanses);
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
      <ExpensesList expenses={expenses} removeExpenseHandler={removeExpenseHandler}></ExpensesList>
    </div>
  );
}
