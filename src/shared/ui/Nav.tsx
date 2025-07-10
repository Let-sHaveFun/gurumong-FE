import { Link, useLocation } from 'react-router-dom';
import { LocationIcon, ExamIcon, UserIcon, AiSmartieIcon } from '@vapor-ui/icons';
import { Dialog } from '@vapor-ui/core';
import { useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
        <Dialog.Overlay />
        <Dialog.CombinedContent className="w-[360px] h-[30%] p-10 border-none justify-center gap-2 z-[10] ">
          <VisuallyHidden>
            <Dialog.Header>
              <Dialog.Title>마이페이지 모달</Dialog.Title>
            </Dialog.Header>
          </VisuallyHidden>
          <Dialog.Body className="z-[10] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-blue-50 rounded-full p-4 mb-4">
                <AiSmartieIcon size={40} color="var(--vapor-color-blue-400)" />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">서비스 준비 중입니다</h2>
              <p className="text-sm text-gray-500 mt-2">
                아직 이 기능은 사용할 수 없어요. <br />곧 멋지게 찾아올게요 🚀
              </p>
            </div>
          </Dialog.Body>
          {/* <Dialog.Footer style={{ marginLeft: 'auto' }}>
            <button style={{ padding: '0.5rem 1rem' }}>확인</button>
          </Dialog.Footer> */}
        </Dialog.CombinedContent>
      </Dialog.Root>
    </footer>
  );
}
