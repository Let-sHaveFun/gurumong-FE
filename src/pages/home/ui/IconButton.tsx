import type { ReactNode, MouseEventHandler } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <div onClick={onClick} className="p-[8px] rounded-full bg-white shadow cursor-pointer">
      {children}
    </div>
  );
};

export default IconButton;
