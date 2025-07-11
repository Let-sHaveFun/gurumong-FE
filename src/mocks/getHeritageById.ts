import { type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

export const getHeritageById = async (id: string): Promise<Heritage | null> => {
  // https://dormung.goorm.training/api/tour-spots/location
  const response = await fetch(`https://dormung.goorm.training/api/tour-spots/location/${id}`);
  const data = await response.json();
  return data ?? null;
  // const response = await fetch(`https://api.example.com/heritage/${id}`);
  // const data = await response.json();
  // return data ?? null;
};
// /api/tour-spots/detai
