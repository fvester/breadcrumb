import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useValidate() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error]);

  return { error, setError };
}
