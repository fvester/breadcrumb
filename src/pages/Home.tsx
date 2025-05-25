import BreadCrumb from '@/components/BreadCrumb';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import type { RouteInfo } from '@/types/components';
import Pickchu from '@/assets/pickachu.svg?react';
import Jiwwo from '@/assets/jiwoo.svg?react';
import RightLink from '@/assets/right_arrow2.svg?react';

// Home Page Component
const Home: React.FC = () => {
  const { pathname: curPath } = useLocation();
  const sigName: string = 'Home';

  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div className="home">
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
        <div className="home-link">
          <BreadCrumb
            className="home"
            routeHistory={[curRouteInfo]}
            curPath={curPath}
          />
          <Link
            className="home-species-btn"
            to="/species"
            state={{ prevRouteHistory: [curRouteInfo] }}
          >
            <div className="home-species-btn-content">
              Pokemon Species List
              <RightLink className="home-species-btn-arrow" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
