import type { RouteInfo } from '@/types/types';
import { Link } from 'react-router-dom';
import './SubCrumb.scss';

interface SubCrumbProps {
  routeInfo: RouteInfo;
  isCur: boolean;
  pathClick: (path: string) => void;
}

const SubCrumb: React.FC<SubCrumbProps> = ({ routeInfo, isCur, pathClick }) => {
  const { sigName, path } = routeInfo;

  const crumbClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ignore Link tag default click event

    if (!isCur) {
      pathClick(path); // Toss navigation logic to parent component by callback
    }
  };

  return (
    <div id="sub-crumb">
      <Link
        className={
          path != '' ? 'sub-crumb-content' : 'sub-crumb-content disabled'
        }
        to={path}
        onClick={crumbClick}
      >
        {sigName}
      </Link>
    </div>
  );
};

export default SubCrumb;
