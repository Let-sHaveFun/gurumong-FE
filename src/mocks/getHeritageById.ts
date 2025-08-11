import { apiClient } from '@/shared/lib/axios';
// import { type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

// https://dormung.goorm.training/api/tour-spots/location
// https://dormung.goorm.training/api/tour-spots/detail?contentId=CONT_000000000500150
// https://dormung.goorm.training/api/tour-spots/detail?contentId=CONT_000000000500150&latitude=33.462147&longitude=126.936424
export const getHeritageById = async (id: string, lat: number, lng: number): Promise<any | null> => {
  const response = await apiClient.get(`/tour-spots/detail?contentId=${id}&latitude=${lat}&longitude=${lng}`);
  return response.data;

  // const response = await fetch(
  //   `https://dormung.goorm.training/api/tour-spots/detail?contentId=${id}&latitude=${lat}&longitude=${lng}`,
  // );
  // const data = await response.json();
  // return data ?? null;
};
