import { type Heritage } from '@/pages/home/api/getNearbyHeritages.mock';

export const getHeritageById = async (id: string): Promise<Heritage | null> => {
  const response = await fetch(`https://api.example.com/heritage/${id}`);
  const data = await response.json();
  return data ?? null;
};
