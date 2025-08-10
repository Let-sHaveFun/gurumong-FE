import { apiClient } from '@/shared/lib/axios';
// "https://dormung.goorm.training/api/tour-spots/search?keyword=%EC%84%B1%EC%82%B0&latitude=33.462147&longitude=126.936424"

export const search = async (query: string) => {
  const response = await apiClient.get(`/tour-spots/search?keyword=${query}`);
  return response.data;
};
