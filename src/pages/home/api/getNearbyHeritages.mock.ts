export type Heritage = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  distance: number; // 단위: meter
};

// ✅ 제주 서귀포시 성산읍 동류암로 20 근처 유적지 mock 데이터 반환
export const getNearbyHeritages = async (_lat: number, _lng: number): Promise<Heritage[]> => {
  const mockData: Heritage[] = [
    {
      id: '1',
      name: '성산일출봉',
      lat: 33.458111,
      lng: 126.941904,
      address: '서귀포시 성산읍 성산리',
      distance: 600,
    },
    {
      id: '2',
      name: '섭지코지 유적지',
      lat: 33.447297,
      lng: 126.925173,
      address: '서귀포시 성산읍 고성리',
      distance: 1400,
    },
    {
      id: '3',
      name: '광치기해변 안내판',
      lat: 33.454323,
      lng: 126.938891,
      address: '서귀포시 성산읍',
      distance: 500,
    },
  ];

  // ✅ API 흉내내기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockData;
};
