import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';
import { Expense } from './types';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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

export async function getExpensesInTimeRange(from: Date, to: Date) {
  const expensesInLastMonth = await getExpensesInRange(from.getTime(), to.getTime());
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
      const updatedExpensesArray = expensesArray.filter((expense: Expense) => expense.timestamp !== timestamp);
      await set(expensesArrayRef, updatedExpensesArray);
    });
  } catch (error) {
    console.error(error);
  }
}
