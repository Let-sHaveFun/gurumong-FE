import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from '@/pages/home/ui/HomePage';
import { TempPage } from '@/pages/temp';
import { MobileLayout } from '@/shared/ui';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'temp',
        element: <TempPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
