import BreadCrumb from '@/components/BreadCrumb';
import './SpeciesOverview.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { PrevPageState, RouteInfo } from '@/types/types';

// Species Overview Page
const SpeciesOverview = () => {
  const location = useLocation();
  const { species: speciesId } = useParams();
  const curPath: string = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const sigName = `${speciesId} Overview`;
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
        state={{ prev_route_history: [...prevRouteHistory, curRouteInfo] }}
      >
        Pokemon List
      </Link>
    </div>
  );
};

export default SpeciesOverview;
