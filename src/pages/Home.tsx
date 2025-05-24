import BreadCrumb from '@/components/BreadCrumb';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import type { RouteInfo } from '@/types/components';

// Home Page Component
const Home = () => {
  const { pathname: curPath } = useLocation();
  const sigName: string = 'Home';

  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div id="home">
      <h1>Home</h1>
      <BreadCrumb routeHistory={[curRouteInfo]} curPath={curPath} />

      <Link
        className="species-button"
        to="/species"
        state={{ prevRouteHistory: [curRouteInfo] }}
      >
        Pokemon Species List
      </Link>
    </div>
  );
};

export default Home;
