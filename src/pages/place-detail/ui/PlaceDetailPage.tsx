import { SuspenseQuery } from '@suspensive/react-query';
import { detailQueryOptions } from '../api/getDetail.query';
import { useParams } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, ErrorBoundary } from '@suspensive/react';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { PlaceDetailView } from './PlaceDetailView';

export function PlaceDetailPage() {
  const { placeId } = useParams();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={<div>Error</div>} onReset={reset}>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <SuspenseQuery {...detailQueryOptions(placeId!)}>
              {({ data }) => <PlaceDetailView data={data.data} />}
            </SuspenseQuery>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
