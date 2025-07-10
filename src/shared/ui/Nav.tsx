import { Link, useLocation } from 'react-router-dom';
import { LocationIcon, ExamIcon, UserIcon } from '@vapor-ui/icons';

export function Nav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: LocationIcon, label: '지도' },
    { to: '/story-fragments', icon: ExamIcon, label: '이야기조각' },
    { to: '/mypage', icon: UserIcon, label: '마이페이지' },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white rounded-t-[8px] mx-auto max-w-[393px] px-[56px] pt-[12px] pb-[18px]">
      <nav className="flex justify-between items-center bg-white">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <Link key={to} to={to} className="flex flex-col justify-center items-center">
              <Icon size={32} color={isActive ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)'} />
              <span
                style={{
                  color: isActive ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)',
                  fontSize: 'var(--vapor-typography-fontSize-050)',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
