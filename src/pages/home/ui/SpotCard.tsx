import { cn } from '@/lib/utils';
import { typography } from '@/shared/style';
import { Button, Text } from '@vapor-ui/core';
import { BookmarkOutlineIcon, SoundOnIcon } from '@vapor-ui/icons';
import { useNavigate } from 'react-router-dom';

interface SpotCard {
  id?: string;
  imageUrl?: string;
  title: string;
  address: string;
  distance: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const SpotCard = ({ id, imageUrl, title, address, distance, isActive = false, onClick }: SpotCard) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'w-full border-gray-400 transition-colors px-[16px] py-[17px] cursor-pointer',
        isActive ? 'bg-gray-50' : 'bg-white',
      )}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            ' bg-gray-100 rounded-sm overflow-hidden',
            isActive ? 'w-[116px] h-[116px]' : 'w-[70px] h-[70px]',
          )}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover" />
          )}
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <Text typography="body1" className={cn(typography.body1, 'text-left line-clamp-1')}>
                {title}
              </Text>
              <Text typography="body3" className={cn(typography.body3, 'line-clamp-1')}>
                {address}
              </Text>
              <Text typography="body3" className={cn('text-[#558CF5]', typography.body3)}>
                내 위치로부터 {Math.round(distance * 1000)}m
              </Text>
            </div>

            <BookmarkOutlineIcon size={16} color="var(--vapor-color-gray-400)" className="cursor-pointer" />
          </div>
          {isActive && (
            <Button className="w-full" size="md" onClick={() => navigate(`/place/${id}`)}>
              <SoundOnIcon size={16} />
              이야기조각 들으러 가기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
