import BreadCrumb from '@/components/BreadCrumb';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import type { RouteInfo } from '@/types/types';

const Home = () => {
  const sig_name: string = 'Home';

  const cur_route_info: RouteInfo = { sig_name: sig_name, path: '/' };

  return (
    <div id="home">
      <h1>Home</h1>
      <BreadCrumb route_history={[cur_route_info]} />

      <Link className="species-button" to="/species">
        Pokemon Species List
      </Link>
    </div>
  );
};

export default Home;
