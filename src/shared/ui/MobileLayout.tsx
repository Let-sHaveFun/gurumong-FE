import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';

export function MobileLayout() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-lg max-w-[393px] min-h-screen flex flex-col">
        <Outlet />
        <Nav />
      </div>
    </div>
  );
}
