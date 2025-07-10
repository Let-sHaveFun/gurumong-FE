import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraOutlineIcon, BackPageOutlineIcon, CloseOutlineIcon } from '@vapor-ui/icons';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export function SearchInput({ value, onChange, onSubmit }: Props) {
  const navigate = useNavigate();

  const handleCameraClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate('/qr');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full h-[48px] flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder="안내판을 검색해보세요..."
          className="w-full rounded-[8px] bg-white pr-[16px] py-[12px] pl-[40px] shadow text-sm "
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit?.(value);
            }
          }}
        />

        <button onClick={handleBackClick} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
          <BackPageOutlineIcon size={16} />
        </button>

        {value ? (
          <button onClick={() => onChange('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
            <CloseOutlineIcon size={16} />
          </button>
        ) : (
          <button onClick={handleCameraClick} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
            <CameraOutlineIcon size={16} color="#4B5563" />
          </button>
        )}
      </div>
    </div>
  );
}
