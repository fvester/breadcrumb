import { useEffect, useState } from 'react';

export function useFetch(urlPath: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      const url = import.meta.env.VITE_BACKEND_URL + urlPath;

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

    fetchData();
  }, []);

  return { data, isLoading, error };
}
