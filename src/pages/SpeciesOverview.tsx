import BreadCrumb from '@/components/BreadCrumb';
import './SpeciesOverview.scss';
import { Link, useParams } from 'react-router-dom';
import type { RouteInfo } from '@/types/components';
import { useFetch } from '@/hooks/UseFetch';
import type { SpeciesOverviewName, SpeciesOverviewRes } from '@/types/model';
import { snakeToCamel } from '@/utils/string';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';

// Species Overview Page
const SpeciesOverview = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const { species: speciesId } = useParams();

  const { data, isLoading, error } = useFetch<SpeciesOverviewRes>(
    `/pokemon-species/${speciesId}`,
    false,
  );

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
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div id="species-overview">
      <h1>Species Overview</h1>
      <BreadCrumb
        routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
        curPath={curPath}
      />

      <Link
        className="species-overview-button"
        to={`/species/${speciesId}/pokemons`}
        state={{
          prevRouteHistory: [...(prevRouteHistory ?? []), curRouteInfo],
        }}
      >
        Show pokemon List
      </Link>
    </div>
  );
};

export default SpeciesOverview;
