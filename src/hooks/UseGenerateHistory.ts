import { historyGenerator } from '@/apis/api';
import type { PrevPageState, RouteInfo } from '@/types/components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useGenerateHistory() {
  const [prevRouteHistory, setPrevRouteHistory] = useState<RouteInfo[] | null>(
    null,
  );

  const location = useLocation();

  const curPath: string = location.pathname;

  useEffect(() => {
    async function history() {
      if (location.state && 'prevRouteHistory' in location.state) {
        const state = location.state as PrevPageState;
        setPrevRouteHistory(state.prevRouteHistory);
      } else {
        const state = await historyGenerator(curPath);
        setPrevRouteHistory(state.prevRouteHistory);
      }
    }

    history();
  }, []);

  return { location, curPath, prevRouteHistory };
}
