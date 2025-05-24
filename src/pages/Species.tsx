import type { PrevPageState, RouteInfo } from '@/types/types';
import './Species.scss';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '@/components/BreadCrumb';
import { useFetch } from '@/hooks/UseFetch';

// Species List Page
const Species = () => {
  const location = useLocation();
  const curPath = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const sigName = 'Pokemon Species List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  const { data, isLoading, error } = useFetch('/pokemon-species');

  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <div id="species">
      <h1>Species</h1>
      <BreadCrumb
        routeHistory={[...prevRouteHistory, curRouteInfo]}
        curPath={curPath}
      />

      <Link
        className="species-button"
        to="/species/2"
        state={{ prevRouteHistory: [...prevRouteHistory, curRouteInfo] }}
      >
        Species overview
      </Link>
    </div>
  );
};

export default Species;
