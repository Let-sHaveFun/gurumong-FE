import { useParams } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';

import { useDormungStore } from '@/shared/store';
import { ErrorFallback } from '@/shared/ui';

import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { heritageItemQueryOptions } from '../api/heritageItem.query';
import { PlaceDetailView } from './PlaceDetailView';

export function PlaceDetailPage() {
  const { placeId } = useParams();

  const location = useDormungStore((state) => state.location);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={ErrorFallback} onReset={reset}>
          <Suspense fallback={<LoadingSpinner />}>
            <SuspenseQuery {...heritageItemQueryOptions(placeId ?? '', location.lat, location.lng)}>
              {/* {({ data }) => <div>{JSON.stringify(data)}</div>} */}
              {({ data: heritage }) => <PlaceDetailView heritage={heritage} />}
            </SuspenseQuery>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
