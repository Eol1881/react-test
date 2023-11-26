import React, { memo } from 'react';
import { HistoryList } from '../components/HistoryList/HistoryList';

export const HistoryPage: React.FC = memo(() => {
  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 pt-5">
      <HistoryList></HistoryList>
    </div>
  );
});
