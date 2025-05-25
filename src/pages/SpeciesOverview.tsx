import BreadCrumb from '@/components/BreadCrumb';
import './SpeciesOverview.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { PrevPageState, RouteInfo } from '@/types/components';
import { useFetch } from '@/hooks/UseFetch';
import type { SpeciesOverviewName, SpeciesOverviewRes } from '@/types/model';
import { snakeToCamel } from '@/utils/string';

// Species Overview Page
const SpeciesOverview = () => {
  const location = useLocation();
  const { species: speciesId } = useParams();
  const curPath: string = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const { data, isLoading, error } = useFetch<SpeciesOverviewRes>(
    `/pokemon-species/${speciesId}`,
    false,
  );

  let names: SpeciesOverviewName[] | null = null;
  let baseHappiness: number | null = null;

  // Need snake_case -> camelCase mapping function
  try {
    const { names: namesCopy, baseHappiness: baseHappinessCopy } =
      snakeToCamel(data);
    names = namesCopy;
    baseHappiness = baseHappinessCopy;
  } catch (error) {
    if (error instanceof Error) {
      // Todo: no data or request error log
    }
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
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div id="species-overview">
      <h1>Species Overview</h1>
      <BreadCrumb
        routeHistory={[...prevRouteHistory, curRouteInfo]}
        curPath={curPath}
      />

      <Link
        className="species-overview-button"
        to={`/species/${speciesId}/pokemons`}
        state={{ prevRouteHistory: [...prevRouteHistory, curRouteInfo] }}
      >
        Show pokemon List
      </Link>
    </div>
  );
};

export default SpeciesOverview;
