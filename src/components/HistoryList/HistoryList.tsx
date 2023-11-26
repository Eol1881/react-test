import { Card, Metric, Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { List } from '@tremor/react';
import { fetchExpenses } from '../../api/api';
import { dateExtractor } from '../../utils/dateExtractor';
import { Expense } from '../../api/types';
import { HistoryItem } from './HistoryItem';

export const HistoryList = () => {
  const navigate = useNavigate();

  const [thisMonthHistory, setThisMonthHistory] = useState<Expense[]>([]);

  useEffect(() => {
    const updateExpenses = async () => {
      const thisMonthHistory = await fetchExpenses(dateExtractor.getTwoWeeksAgo(), dateExtractor.getThisDay());
      setThisMonthHistory(thisMonthHistory);
    };

    updateExpenses();
  }, []);

  const toMainHandler = () => {
    navigate('/');
  };

  return (
    <Card className="mx-auto max-w-xs space-y-4 ring-transparent" decoration="top" decorationColor="rose">
      <Button iconPosition="right" icon={ArrowLeftIcon} variant="secondary" onClick={toMainHandler} className="w-full">
        Назад
      </Button>
      <Metric>История покупок</Metric>
      <List>
        {thisMonthHistory
          .slice()
          .reverse()
          .map((expense) => (
            <HistoryItem
              expenseData={expense}
              thisMonthHistory={thisMonthHistory}
              setThisMonthHistory={setThisMonthHistory}
            />
          ))}
      </List>
    </Card>
  );
};
