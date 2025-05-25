import BreadCrumb from '@/components/BreadCrumb';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import type { RouteInfo } from '@/types/components';
import Pickchu from '@/assets/pickachu.svg?react';
import Jiwwo from '@/assets/jiwoo.svg?react';

// Home Page Component
const Home: React.FC = () => {
  const { pathname: curPath } = useLocation();
  const sigName: string = 'Home';

  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div className="home">
      <BreadCrumb routeHistory={[curRouteInfo]} curPath={curPath} />
      <div className="home-container">
        <div className="home-banner">
          <div className="home-banner-left">
            <div className="home-banner-left-pad"></div>
            <Jiwwo className="home-banner-left-img" />
          </div>
          <div className="home-banner-right">
            <Pickchu />
            <div className="home-banner-right-pad"></div>
          </div>
        </div>

        <Link
          className="species-button"
          to="/species"
          state={{ prevRouteHistory: [curRouteInfo] }}
        >
          Pokemon Species List
        </Link>
      </div>
    </div>
  );
};

export default Home;
