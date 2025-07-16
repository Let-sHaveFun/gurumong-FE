import LoadingSpinner from './LoadingSpinner';

export function FullPageLoader() {
  return (
    <div className="max-w-[393px] min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
