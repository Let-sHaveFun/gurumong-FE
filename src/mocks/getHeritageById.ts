import { getNearbyHeritages, type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

export const getHeritageById = async (id: string): Promise<Heritage | null> => {
  const data = await getNearbyHeritages(0, 0);
  return data.find((h) => h.id === id) ?? null;
};
