import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';
import { Expense } from '../types/Expense';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBA518IDU-M_3S8DC2NV0LEVmKU1Nmd1KI',
  authDomain: 'pet-3-2c30e.firebaseapp.com',
  databaseURL: 'https://pet-3-2c30e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pet-3-2c30e',
  storageBucket: 'pet-3-2c30e.appspot.com',
  messagingSenderId: '295104900832',
  appId: '1:295104900832:web:1748df2946683a81c82a85',
  measurementId: 'G-Z4770V5V8Y',
};

// Initialize Firebase (SDK)
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get a reference to the expenses array
const expensesArrayRef = ref(db, 'expenses-array-3');

function getExpensesInRange(startTimestamp: number, endTimestamp: number) {
  return new Promise<Expense[]>((resolve, reject) => {
    onValue(
      expensesArrayRef,
      (snapshot) => {
        const expensesArray = snapshot.val() || [];

        // Filter expenses within the specified time range
        const expensesInRange: Expense[] = expensesArray.filter((expense: Expense) => {
          return expense.timestamp >= startTimestamp && expense.timestamp <= endTimestamp;
        });

        // Resolve the promise with the filtered expenses
        resolve(expensesInRange);
      },
      (error) => {
        // Reject the promise with the error
        reject(error);
      }
    );
  });
}

export async function getLastMonthExpenses() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  const expensesInLastMonth = await getExpensesInRange(lastMonth.getTime(), now.getTime());
  return expensesInLastMonth;
}

export async function addExpenseToDatabase(timestamp: number, value: number, type: string) {
  const expenseDataObj = {
    timestamp,
    value,
    type,
  };

  try {
    const snapshot = await get(expensesArrayRef);
    const expensesArray = snapshot.val() || [];
    expensesArray.push(expenseDataObj);
    await set(expensesArrayRef, expensesArray);
  } catch (error) {
    console.error(error);
  }
}

export async function removeExpenseFromDatabase(timestamp: number) {
  try {
    onValue(expensesArrayRef, async (snapshot) => {
      const expensesArray = snapshot.val() || [];
      const updatedExpensesArray = expensesArray.filter(
        (expense: Expense) => expense.timestamp !== timestamp
      );
      await set(expensesArrayRef, updatedExpensesArray);
    });
  } catch (error) {
    console.error(error);
  }
}
