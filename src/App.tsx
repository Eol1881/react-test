import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';

import { ErrorPage } from './routes/ErrorPage';
import { HistoryPage } from './routes/HistoryPage';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/history',
    element: <HistoryPage />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routerConfig);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
