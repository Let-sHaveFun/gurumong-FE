import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { TempPage } from '@/pages/temp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>,
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
