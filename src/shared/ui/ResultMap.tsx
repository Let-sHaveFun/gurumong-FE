import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { SpotCard } from '@/pages/home/ui/SpotCard';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getHeritageById } from '@/mocks/getHeritageById';
import { useDormungStore } from '../store';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  query: string;
  id: string;
};

export const ResultMap = ({ query, id }: Props) => {
  const { location } = useDormungStore();
  const [isLoading, setIsLoading] = useState(false);
  const [heritage, setHeritage] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const found = await getHeritageById(id, location.lat, location.lng);
        setHeritage(found);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id, location]);

  console.log(heritage);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!heritage) {
    return <p className="text-center pt-10">"{query}"에 대한 유적지를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="relative w-full h-full">
      <Map
        center={{ lat: heritage.latitude, lng: heritage.longitude }}
        style={{ width: '100%', height: '100%' }}
        level={8}
      >
        <MapMarker
          position={{ lat: heritage.latitude, lng: heritage.longitude }}
          image={{
            src: '/active-spot-marker.svg',
            size: { width: 40, height: 40 },
            options: { offset: { x: 20, y: 40 } },
          }}
        />
      </Map>

      <div className="absolute right-4 flex flex-col items-center gap-[8px] transition-all duration-300 z-10">
        <Drawer open>
          <DrawerContent className="max-w-[393px] h-350px mx-auto rounded-[8px] border-none p-0">
            <VisuallyHidden>
              <DrawerTitle>관광지 목록</DrawerTitle>
            </VisuallyHidden>
            <DrawerHeader className="text-center mt-4 p-0">
              <div className="h-full min-h-[300px] overflow-y-auto">
                <SpotCard
                  // imageUrl={heritage['imgPath']}
                  // key={heritage['externalId']}
                  // title={heritage.name}
                  // address={heritage.address}
                  // distance={heritage.distance}
                  // isActive
                  imageUrl={heritage['imgPath']}
                  key={heritage['externalId']}
                  id={heritage['externalId']}
                  title={heritage.name}
                  address={heritage.address}
                  distance={heritage.distance}
                  isActive
                />
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
