import type { PrevPageState, RouteInfo } from '@/types/components';
import type { SpeciesOverviewName } from '@/types/model';
import { snakeToCamel } from '@/utils/string';
import { matchPath } from 'react-router-dom';

// If lower index => upper page (index based relation)
const routeStructure = [
  { path: '/', sigName: 'Home' },
  {
    path: '/species',
    sigName: 'Pokemon Species List',
  },
  { path: '/species/:species', sigName: '' },
  {
    path: '/species/:species/pokemons',
    sigName: 'Pokemon List',
  },
  {
    path: '/species/:species/pokemons/:pokemon',
    sigName: '',
  },
];

export async function historyGenerator(
  curPath: string,
): Promise<PrevPageState> {
  // Need urlPath validation => regex

  // Find matching path
  const matchIdx = routeStructure.findIndex(
    (val: { path: string; sigName: string | null }) =>
      matchPath(val.path, curPath) != null,
  );

  const prevRouteHistory: RouteInfo[] = routeStructure.slice(0, matchIdx);

  // Dynamic Signature creation
  // In here, just make /species/:species sigName
  if (matchIdx > 2) {
    const speciesId = curPath.split('/')[2];
    const url =
      import.meta.env.VITE_BACKEND_URL + `/pokemon-species/${speciesId}`;

    try {
      const res: Response = await fetch(url);
      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();

      let names: SpeciesOverviewName[] | null = null;
      let baseHappiness: number | null = null;

      // Need snake_case -> camelCase mapping function
      if (data !== null) {
        const { names: namesCopy, baseHappiness: baseHappinessCopy } =
          snakeToCamel(data);
        names = namesCopy;
        baseHappiness = baseHappinessCopy;
      }

      // Get name
      const speciesName = names
        ?.filter(
          (val: SpeciesOverviewName) =>
            val.language.name === 'en' || val.language.name === 'ko',
        )
        .map((val) => val.name)
        .join('/');

      const sigName = `${speciesName} Overview`;

      // Set signame for /species/:species
      prevRouteHistory[2].sigName = sigName;

      // Change path to real speciesId
      prevRouteHistory.map((v: RouteInfo) => {
        v.path = v.path.replace(':species', speciesId);
      });
    } catch (error) {
      if (error instanceof Error) {
        // Todo: error handling
        console.error(error.message);
      }
    }
  }

  return {
    prevRouteHistory: prevRouteHistory,
  };
}
