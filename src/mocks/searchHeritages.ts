import { mockHeritages } from './mockHeritages';

export const searchHeritages = async (query: string) => {
  const q = query.toLowerCase();
  return mockHeritages.filter((h) => h.name.toLowerCase().includes(q));
};
