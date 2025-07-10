import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, BackPageOutlineIcon, CloseOutlineIcon } from '@vapor-ui/icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  const navigate = useNavigate();

  const handleCameraClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate('/qr');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder="안내판을 검색해보세요..."
          className="w-full rounded-[8px] bg-white px-[16px] py-[12px] pl-[32px] shadow text-sm "
        />

        <button onClick={handleBackClick} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
          <BackPageOutlineIcon size={16} />
        </button>

        {value ? (
          <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <CloseOutlineIcon size={16} />
          </button>
        ) : (
          <button onClick={handleCameraClick} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <CameraIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
