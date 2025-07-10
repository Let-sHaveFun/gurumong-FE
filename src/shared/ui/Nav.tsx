import { Link, useLocation } from 'react-router-dom';
import { LocationIcon, ExamIcon, UserIcon } from '@vapor-ui/icons';
import { Dialog } from '@vapor-ui/core';
import { useState } from 'react';

export function Nav() {
  const location = useLocation();
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const navItems = [
    { to: '/', icon: LocationIcon, label: '지도' },
    { to: '/story-fragments', icon: ExamIcon, label: '이야기조각' },
    // { to: '/mypage', icon: UserIcon, label: '마이페이지' },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white rounded-t-[8px] mx-auto max-w-[393px] px-[56px] pt-[12px] pb-[18px] z-[1]">
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

        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => setIsMyPageOpen(true)}>
          <UserIcon size={32} color={'var(--vapor-color-gray-400)'} />
          <span
            style={{
              // color: isActive ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)',
              color: 'var(--vapor-color-gray-400)',
              fontSize: 'var(--vapor-typography-fontSize-050)',
            }}
          >
            마이페이지
          </span>
        </div>
      </nav>

      <Dialog.Root open={isMyPageOpen} onOpenChange={setIsMyPageOpen}>
        <Dialog.Overlay className="" />
        <Dialog.CombinedContent className="w-[393px] h-[30%] p-10 border-none justify-center gap-2 z-[10] ">
          <Dialog.Header>
            <Dialog.Title>알림</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="z-[10] flex flex-col justify-center items-center">
            <span className="text-black z-[10]">Oops! 아직 준비중이에요. 🚀</span>
          </Dialog.Body>
          {/* <Dialog.Footer style={{ marginLeft: 'auto' }}>
            <button style={{ padding: '0.5rem 1rem' }}>확인</button>
          </Dialog.Footer> */}
        </Dialog.CombinedContent>
      </Dialog.Root>
    </footer>
  );
}
