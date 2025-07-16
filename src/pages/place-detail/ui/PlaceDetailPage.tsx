import { useParams } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';

import { useDormungStore } from '@/shared/store';
import { ErrorFallback, FullPageLoader } from '@/shared/ui';

import { heritageItemQueryOptions } from '../api/heritageItem.query';
import { PlaceDetailView } from './PlaceDetailView';

export function PlaceDetailPage() {
  const { placeId } = useParams<{ placeId: string }>();

  const location = useDormungStore((state) => state.location);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={ErrorFallback} onReset={reset}>
          <Suspense fallback={<FullPageLoader />}>
            <SuspenseQuery {...heritageItemQueryOptions(placeId!, location.lat, location.lng)}>
              {({ data: heritage }) => <PlaceDetailView heritage={heritage} />}
            </SuspenseQuery>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
