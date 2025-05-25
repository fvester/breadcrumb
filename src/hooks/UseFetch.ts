import type { PageResponse } from '@/types/model';
import { useEffect, useState } from 'react';

// Fetch custom hook
export function useFetch<T>(urlPath: string, page: boolean) {
  const [data, setData] = useState<T | PageResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      const url = import.meta.env.VITE_BACKEND_URL + urlPath;

      // Todo: fix code. it is just simple total page call for mvp.
      if (page) {
        try {
          const res: Response = await fetch(url);
          if (!res.ok) throw new Error('Page Request failed');

          const initData: PageResponse<T> = await res.json();
          const count = initData.count;

          const totalRes: Response = await fetch(
            `${url}?offset=0&limit=${count}`,
          );

          const totalData: PageResponse<T> = await totalRes.json();

          setData(totalData);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            throw error;
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const res: Response = await fetch(url);
          if (!res.ok) throw new Error('Request failed');

          const data = await res.json();

          setData(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            throw error;
          }
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
