import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { HomePage } from '@/pages/home/ui/HomePage';
import { TempPage } from '@/pages/temp';
import { MobileLayout } from '@/shared/ui';
import { QRPage } from './qr/ui/QRPage';
import { StoryFragmentPage } from './story-fragment/ui/StoryFragmentPage';
import { MyPage } from './mypage/ui/MyPage';
import { PlaceDetailPage } from './place-detail';
import SearchPage from '@/pages/search/ui/SearchPage';
import { SplashPage } from './SplashPage';
import { MobileLayoutWithoutNav } from '@/shared/ui/MobileLayoutWithoutNav';
import { OnboardingPage } from './Onboarding';
import { FirstVisitCheckProvider } from '@/shared/ui/FirstVisitCheckProvider';

const router = createBrowserRouter([
  {
    path: '/splash',
    element: (
      <MobileLayoutWithoutNav>
        <SplashPage />
      </MobileLayoutWithoutNav>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <MobileLayoutWithoutNav>
        <OnboardingPage />
      </MobileLayoutWithoutNav>
    ),
  },
  {
    path: 'place/:placeId',
    element: (
      <MobileLayoutWithoutNav>
        <PlaceDetailPage />
      </MobileLayoutWithoutNav>
    ),
  },
  // {
  //   path: 'story-fragments',
  //   element: (
  //     <MobileLayoutWithoutNav>
  //       <StoryFragmentPage />
  //     </MobileLayoutWithoutNav>
  //   ),
  // },
  {
    path: '/',
    element: (
      <FirstVisitCheckProvider>
        <MobileLayout />
      </FirstVisitCheckProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'onboarding',
        element: <SplashPage />,
      },
      {
        path: 'story-fragments',
        element: <StoryFragmentPage />,
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
        path: 'mypage',
        element: <MyPage />,
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
