import type { PageResponse } from '@/types/model';
import { useEffect, useState } from 'react';

// For test loading indicator
/**
 *
 * @deprecated
 */
export function useFetchRecur(urlPath: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);
      setError(null);

      const url = import.meta.env.VITE_BACKEND_URL + urlPath;

      try {
        const res: Response = await fetch(url);
        if (!res.ok) throw new Error('First Request failed');

        const initData: PageResponse = await res.json();

        const totalRet = [...initData.results];
        let nextURL = initData.next;

        // Dangerous code => inf loop
        while (nextURL != null) {
          const nextRes: Response = await fetch(nextURL);

          if (!nextRes.ok) throw new Error('Request failed');

          const nextData: PageResponse = await nextRes.json();

          const nextRet = nextData.results;

          nextURL = nextData.next;

          totalRet.push(...nextRet);
        }

        setData(totalRet);
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

    fetchAllData();
  }, []);

  return { data, isLoading, error };
}
