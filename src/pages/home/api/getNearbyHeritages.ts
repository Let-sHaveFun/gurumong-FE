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
  const response = await axios.get<Heritage[]>('/api/heritages', {
    params: { lat, lng, radius },
  });

  return response.data;
};
