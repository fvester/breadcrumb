import type { RouteInfo } from '@/types/types';
import { Link, useNavigate } from 'react-router-dom';

const SubCrumb: React.FC<RouteInfo> = ({ sig_name, path }) => {
  const navigate = useNavigate();

  const has_link: boolean = path !== '';

  const crumbClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (has_link) {
      navigate(path);
    }
  };

  return (
    <div id="sub-crumb">
      <Link
        className={has_link ? 'sub-crumb-content' : 'sub-crumb-content disable'}
        to={path}
        onClick={crumbClick}
      >
        {sig_name}
      </Link>
    </div>
  );
};

export default SubCrumb;
