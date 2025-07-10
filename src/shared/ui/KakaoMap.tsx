import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer';
import { cn } from '@/lib/utils';
import { BulletlistOutlineIcon, BookmarkIcon, ExploreIcon } from '@vapor-ui/icons';
import IconButton from '@/pages/home/ui/IconButton';
import { getNearbyHeritages, type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';
import { SpotCard } from '@/pages/home/ui/SpotCard';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type Location = { lat: number; lng: number };

export const KakaoMap = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [heritages, setHeritages] = useState<Heritage[]>([]);
  const [_selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<'list' | 'bookmark' | 'explore' | null>(null);
  const [activeHeritageId, setActiveHeritageId] = useState<string | null>(null);
  const [_center, setCenter] = useState<Location | null>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        setLocation(userLocation);
        setCenter(userLocation);

        try {
          const heritages = await getNearbyHeritages(latitude, longitude);
          setHeritages(heritages);
          if (heritages.length > 0) {
            setActiveHeritageId(heritages[0].id);
          }
        } catch (error) {
          console.error('유적지 정보를 불러오는 데 실패했습니다:', error);
        }
      },
      (error) => {
        console.error('위치 정보를 가져오는데 실패했습니다:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (!location) return <p>내 위치를 불러오는 중...</p>;

  return (
    <div className="relative w-full h-full">
      <Map
        center={location}
        style={{ width: '100%', height: '100%' }}
        level={8}
        onCreate={(map) => {
          mapRef.current = map;
        }}
      >
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
              setActiveHeritageId(heritage.id);
              setSelectedHeritage(heritage);
              setIsDrawerOpen(true);
              setActiveButton('list');
            }}
            image={{
              src: heritage.id === activeHeritageId ? '/active-spot-marker.svg' : '/spot-marker.svg',
              size: heritage.id === activeHeritageId ? { width: 40, height: 40 } : { width: 32, height: 32 },
              options: heritage.id === activeHeritageId ? { x: 20, y: 40 } : { x: 16, y: 32 },
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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} snapPoints={[0.4, 1]}>
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

          <DrawerContent className="max-w-[393px] h-full max-h-screen mx-auto rounded-[8px] border-none p-0">
            <VisuallyHidden>
              <DrawerTitle>관광지 목록</DrawerTitle>
            </VisuallyHidden>
            <DrawerHeader className="text-center mt-4 p-0">
              {heritages.length > 0 ? (
                <div className="h-full min-h-[300px] overflow-y-auto">
                  {heritages.map((heritage) => (
                    <SpotCard
                      key={heritage.id}
                      title={heritage.name}
                      address={heritage.address}
                      distance={heritage.distance}
                      isActive={heritage.id === activeHeritageId}
                      onClick={() => setActiveHeritageId(heritage.id)}
                    />
                  ))}
                </div>
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

        <IconButton
          onClick={() => {
            if (location && mapRef.current) {
              mapRef.current.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
              setActiveButton('explore');
            }
          }}
        >
          <ExploreIcon
            size={24}
            color={activeButton === 'explore' ? 'var(--vapor-color-blue-400)' : 'var(--vapor-color-gray-400)'}
            className="z-1"
          />
        </IconButton>
      </div>
    </div>
  );
};
