import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';

import { ErrorPage } from './routes/ErrorPage';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routerConfig);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
