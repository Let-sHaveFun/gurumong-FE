import { apiClient } from '@/shared/lib/axios';

import type { Heritage } from '../model/heritage.type';

export const fetchHeritageById = async (id: string, lat: number, lng: number) => {
  // const response = await fetch(
  //   `https://dormung.goorm.training/api/tour-spots/detail?contentId=${id}&latitude=${lat}&longitude=${lng}`,
  // );
  // const data = await response.json();
  // return data ?? null;
  const response = await apiClient.get<Heritage>(`/tour-spots/detail?contentId=${id}&latitude=${lat}&longitude=${lng}`);
  return response.data;
};
