import { useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { SearchOutlineIcon, CameraOutlineIcon } from '@vapor-ui/icons';

export function SearchBar() {
  const navigate = useNavigate();

  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/search');
  };

  const handleCameraClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate('/qr');
  };

  return (
    <button
      onClick={handleSearchClick}
      className="w-full flex items-center justify-between bg-white rounded-[8px] px-[16px] py-[12px] shadow z-20"
    >
      <div className="flex items-center text-gray-400 text-sm gap-[8px]">
        <SearchOutlineIcon />
        안내판을 검색해보세요...
      </div>
      <button onClick={handleCameraClick} className="p-1">
        <CameraOutlineIcon size={16} color="#4B5563" />
      </button>
    </button>
  );
}
