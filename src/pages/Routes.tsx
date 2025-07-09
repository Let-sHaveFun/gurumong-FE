import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { TempPage } from '@/pages/temp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/temp',
    element: <TempPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
    // element: <NotFound />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
