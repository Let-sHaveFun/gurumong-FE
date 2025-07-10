import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from '@/pages/home/ui/HomePage';
import { TempPage } from '@/pages/temp';
import { MobileLayout } from '@/shared/ui';
import { QRPage } from './qr/ui/QRPage';
import { StoryFragmentPage } from './story-fragment/ui/StoryFragmentPage';
import { MyPage } from './mypage/ui/MyPage';
import { PlaceDetailPage } from './place-detail';
import SearchPage from '@/pages/search/ui/SearchPage';

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
        path: 'qr',
        element: <QRPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'story-fragments',
        element: <StoryFragmentPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'place/:placeId',
        element: <PlaceDetailPage />,
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
