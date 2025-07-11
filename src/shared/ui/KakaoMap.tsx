import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer';
import { cn } from '@/lib/utils';
import { BulletlistOutlineIcon, BookmarkIcon, ExploreIcon } from '@vapor-ui/icons';
import IconButton from '@/pages/home/ui/IconButton';
import { getNearbyHeritages, type Heritage } from '@/pages/home/api/getNearbyHeritages';
import { SpotCard } from '@/pages/home/ui/SpotCard';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { SearchBar } from '@/shared/ui/SearchBar';
import { NoResult } from '@/shared/ui/NoResult';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { useDormungStore } from '../store';

type Location = { lat: number; lng: number };

export const KakaoMap = () => {
  const { setLocation: setGlobalLocation } = useDormungStore();

  const [location, setLocation] = useState<Location | null>(null);
  const [heritages, setHeritages] = useState<any[]>([]);
  const [_selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<'list' | 'bookmark' | 'explore' | null>(null);
  const [activeHeritageId, setActiveHeritageId] = useState<any | null>(null);
  const [_center, setCenter] = useState<Location | null>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);

  // useEffect(() => {
  //   fetch('https://api.example.com/heritages')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHeritages(data);
  //       console.log(data);
  //     });
  // }, []);

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
        setGlobalLocation(userLocation);
        setCenter(userLocation);

        try {
          const heritages = await getNearbyHeritages(latitude, longitude);

          setHeritages(heritages);

          if (heritages.length > 0) {
            setActiveHeritageId(heritages[0].externalId);
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

  if (!location)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-[393px] px-4">
        <SearchBar />
      </div>
      <Map
        center={location}
        style={{ width: '100%', height: '100%' }}
        level={8}
        onCreate={(map) => {
          mapRef.current = map;
        }}
        onCenterChanged={() => {
          if (mapRef.current && location) {
            const center = mapRef.current.getCenter();
            const dx = center.getLat() - location.lat;
            const dy = center.getLng() - location.lng;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0.0005) {
              setActiveButton((prev) => (prev === 'explore' ? null : prev));
            }
          }
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

        {heritages.slice(0, 5).map((heritage) => (
          <MapMarker
            key={heritage['externalId']}
            position={{ lat: heritage.latitude, lng: heritage.longitude }}
            onClick={() => {
              setActiveHeritageId(heritage['externalId']);
              setSelectedHeritage(heritage);
              setIsDrawerOpen(true);
              setActiveButton('list');
            }}
            image={{
              src: heritage['externalId'] === activeHeritageId ? '/active-spot-marker.svg' : '/spot-marker.svg',
              size: heritage['externalId'] === activeHeritageId ? { width: 40, height: 40 } : { width: 32, height: 32 },
              options:
                heritage['externalId'] === activeHeritageId
                  ? { offset: { x: 20, y: 40 } }
                  : { offset: { x: 16, y: 32 } },
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
        <Drawer
          open={isDrawerOpen}
          onOpenChange={(open) => {
            setIsDrawerOpen(open);
            if (!open) {
              setActiveButton(null);
            }
          }}
          snapPoints={[0.35, 1]}
        >
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
                  {heritages.slice(0, 5).map((heritage) => (
                    <SpotCard
                      imageUrl={heritage['imgPath']}
                      key={heritage['externalId']}
                      id={heritage['externalId']}
                      title={heritage.name}
                      address={heritage.address}
                      distance={heritage.distance}
                      isActive={heritage['externalId'] === activeHeritageId}
                      onClick={() => setActiveHeritageId(heritage['externalId'])}
                    />
                  ))}
                </div>
              ) : (
                <NoResult />
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
