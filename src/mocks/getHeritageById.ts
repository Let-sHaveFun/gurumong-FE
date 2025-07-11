// import { type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

// https://dormung.goorm.training/api/tour-spots/location
// https://dormung.goorm.training/api/tour-spots/detail?contentId=CONT_000000000500150
export const getHeritageById = async (id: string): Promise<any | null> => {
  const response = await fetch(`https://dormung.goorm.training/api/tour-spots/detail?contentId=${id}`);
  const data = await response.json();
  return data ?? null;
};
