import './App.css';
import { NewExpense } from './components/NewExpense';
import { Expenses } from './components/Expenses';

function App() {
  return (
    <div className="app">
      <NewExpense></NewExpense>
      <Expenses></Expenses>
    </div>
  );
}

export default App;
