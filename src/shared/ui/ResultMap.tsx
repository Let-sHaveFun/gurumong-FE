import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { SpotCard } from '@/pages/home/ui/SpotCard';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getHeritageById } from '@/mocks/getHeritageById';

type Props = {
  query: string;
  id: string;
};

export const ResultMap = ({ query, id }: Props) => {
  const [heritage, setHeritage] = useState<any | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const found = await getHeritageById(id);
      setHeritage(found);
    };
    fetch();
  }, [id]);

  console.log(heritage);

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
                  // imageUrl={heritage['imgpath']}
                  // key={heritage['external_id']}
                  // title={heritage.name}
                  // address={heritage.address}
                  // distance={heritage.distance}
                  // isActive
                  imageUrl={heritage['imgpath']}
                  key={heritage['external_id']}
                  id={heritage['external_id']}
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
