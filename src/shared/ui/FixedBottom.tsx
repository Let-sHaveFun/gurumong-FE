import { createPortal } from 'react-dom';

import { cn } from '@/shared/style';

export function FixedBottom({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const $portalRoot = document.getElementById('__portal');
  if ($portalRoot == null) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        'flex gap-3 fixed left-0 right-0 bottom-0 pt-4 pb-[72px] px-5 z-[1] mx-auto justify-center max-w-[393px]',
        className,
      )}
      {...props}
    ></div>,
    $portalRoot,
  );
}
