import { apiClient } from '@/shared/lib/axios';
import { useEffect } from 'react';

export const TempPage = () => {
  useEffect(() => {
    async function api() {
      apiClient.get('/hello').then((res) => {
        console.log(res);
      });
    }

    api();
  }, []);
  return <div>TempPage 2</div>;
};
