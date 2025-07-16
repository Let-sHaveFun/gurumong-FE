import { fetchHeritageById } from '@/entities/heritage';
import { queryOptions } from '@tanstack/react-query';

export const heritageItemQueryOptions = (id: string, lat: number, lng: number) =>
  queryOptions({
    queryKey: ['heritage', id, lat, lng],
    queryFn: () => fetchHeritageById(id, lat, lng),
  });
