import BreadCrumb from '@/components/BreadCrumb';
import './SpeciesOverview.scss';
import { Link, useParams } from 'react-router-dom';
import type { RouteInfo } from '@/types/components';
import { useFetch } from '@/hooks/UseFetch';
import type { SpeciesOverviewName, SpeciesOverviewRes } from '@/types/model';
import { snakeToCamel } from '@/utils/string';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';
import RightLink from '@/assets/right_arrow2.svg?react';
import Loader from '@/components/common/Loader';

// Species Overview Page
const SpeciesOverview: React.FC = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const { species: speciesId } = useParams();

  const { data, isLoading, error } = useFetch<SpeciesOverviewRes>(
    `/pokemon-species/${speciesId}`,
    false,
  );

  let names: SpeciesOverviewName[] | null = null;
  let baseHappiness: number | null = null;
  let captureRate: number | null = null;
  let hasGenderDifferences: boolean | null = null;

  // Need snake_case -> camelCase mapping function
  if (data) {
    const {
      names: namesCopy,
      baseHappiness: baseHappinessCopy,
      captureRate: captureRateCopy,
      hasGenderDifferences: hasGenderDifferencesCopy,
    } = snakeToCamel(data);

    names = namesCopy;
    baseHappiness = baseHappinessCopy;
    captureRate = captureRateCopy;
    hasGenderDifferences = hasGenderDifferencesCopy;
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
    <div className="species-overview">
      {isLoading && <Loader />}
      <div className="species-overview-container">
        <h1>{speciesName} Overview</h1>
        <BreadCrumb
          className="species-overview"
          routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
          curPath={curPath}
        />

        <div className="species-overview-area">
          <ul className="species-overview-fields">
            <li className="species-overview-info">
              base_happiness: {baseHappiness}{' '}
            </li>
            <li className="species-overview-info">
              capture_rate: {captureRate}
            </li>
            <li className="species-overview-info">
              has_gender_differences: {hasGenderDifferences ? 'Yes' : 'No'}
            </li>
          </ul>
          <div className="species-overview-pokemons">
            <Link
              className="species-overview-btn"
              to={`/species/${speciesId}/pokemons`}
              state={{
                prevRouteHistory: [...(prevRouteHistory ?? []), curRouteInfo],
              }}
            >
              <div className="species-overview-btn-content">
                Show pokemon List
              </div>
              <RightLink
                className="species-overview-link-icon"
                style={{ width: '1em', paddingLeft: '2px' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesOverview;
