import axios from 'axios';

export type Heritage = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  distance: number;
};

// 서버에서 3km 반경 유적지를 가져오는 API
export const getNearbyHeritages = async (lat: number, lng: number, radius: number = 3): Promise<Heritage[]> => {
  // const response = await axios.get<Heritage[]>('https://api.example.com/heritages', {
  //   params: { lat, lng, radius },
  // });

  // latitude (required): 위도 (BigDecimal)
  // longitude (required): 경도 (BigDecimal)
  // radius (optional): 반경(km), 기본값 10, 최대 10

  const response = await axios.get<Heritage[]>('https://dormung.goorm.training/api/tour-spots/location', {
    params: { latitude: lat, longitude: lng, radius },
  });

  return response.data;
};
