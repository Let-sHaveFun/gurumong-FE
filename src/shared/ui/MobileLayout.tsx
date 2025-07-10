import { Outlet } from 'react-router-dom';

export function MobileLayout() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div
        className="w-full bg-white shadow-lg"
        style={{
          maxWidth: '393px',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
