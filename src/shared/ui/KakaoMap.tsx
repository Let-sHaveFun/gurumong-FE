import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer';
import { cn } from '@/lib/utils';
import { BulletlistOutlineIcon, BookmarkIcon, ExploreIcon } from '@vapor-ui/icons';
import IconButton from '@/pages/home/ui/IconButton';
import { getNearbyHeritages, type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

type Location = { lat: number; lng: number };

export const KakaoMap = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [heritages, setHeritages] = useState<Heritage[]>([]);
  const [selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<'list' | 'bookmark' | 'explore' | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setLocation(userLocation);

          try {
            const heritages = await getNearbyHeritages(latitude, longitude); // ✅ 목데이터 호출
            setHeritages(heritages);
          } catch (error) {
            console.error('유적지 정보를 불러오는 데 실패했습니다:', error);
          }
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error);
        },
      );
    } else {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
  }, []);

  const closestHeritage = heritages.length > 0 ? heritages[0] : null;

  if (!location) return <p>내 위치를 불러오는 중...</p>;

  return (
    <div className="relative w-full h-full">
      <Map center={location} style={{ width: '100%', height: '100%' }} level={6}>
        <MapMarker
          position={location}
          image={{
            src: '/marker.png',
            size: { width: 30, height: 30 },
            options: { offset: { x: 24, y: 48 } },
          }}
        />

        {heritages.map((heritage) => (
          <MapMarker
            key={heritage.id}
            position={{ lat: heritage.lat, lng: heritage.lng }}
            onClick={() => {
              setSelectedHeritage(heritage);
              setIsDrawerOpen(true);
              setActiveButton('list');
            }}
            image={{
              src: '/spot-marker.svg',
              size: { width: 32, height: 32 },
              options: { offset: { x: 16, y: 32 } },
            }}
          />
        ))}
      </Map>

      <div
        className={cn(
          'absolute right-4 flex flex-col items-center gap-[8px] transition-all duration-300 z-10',
          isDrawerOpen ? 'bottom-[300px]' : 'bottom-[40px]',
        )}
      >
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <IconButton
              onClick={() => {
                setActiveButton('list');
                setIsDrawerOpen(true);
              }}
            >
              <BulletlistOutlineIcon
                size={24}
                color={activeButton === 'list' ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)'}
              />
            </IconButton>
          </DrawerTrigger>

          <DrawerContent className="max-w-[393px] h-[350px] mx-auto rounded-[8px] border-none">
            <DrawerHeader className="text-center mt-4">
              {selectedHeritage ? (
                <>
                  <DrawerTitle className="text-base font-bold">{selectedHeritage.name}</DrawerTitle>
                  <p className="text-gray-500 text-sm">{selectedHeritage.address}</p>
                  <p className="text-blue-500 text-sm mt-1">내 위치로부터 {selectedHeritage.distance}m</p>
                  {selectedHeritage.id === closestHeritage?.id && (
                    <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md text-sm w-full">
                      🎧 이야기조각 들으러 가기
                    </button>
                  )}
                </>
              ) : (
                <DrawerTitle className="text-gray-500 text-sm">내 주위에 둘러볼 이야기조각이 없어요!</DrawerTitle>
              )}
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <IconButton onClick={() => setActiveButton('bookmark')}>
          <BookmarkIcon
            size={24}
            color={activeButton === 'bookmark' ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)'}
          />
        </IconButton>

        <IconButton onClick={() => setActiveButton('explore')}>
          <ExploreIcon
            size={24}
            color={activeButton === 'explore' ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)'}
          />
        </IconButton>
      </div>
    </div>
  );
};
