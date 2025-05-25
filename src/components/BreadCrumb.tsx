import type { RouteInfo } from '@/types/components';
import './BreadCrumb.scss';
import SubCrumb from './SubCrumb';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/right_arrow.svg?react';

interface BreadCrumbProps {
  className: string;
  routeHistory: RouteInfo[];
  curPath: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  className,
  routeHistory,
  curPath,
}) => {
  const navigate = useNavigate();

  const pathClick = (path: string) => {
    console.log(`Navigate to ${path}`);

    // Make prevRouteHistory
    const idx = routeHistory.findIndex((routeInfo) => routeInfo.path == path);
    const prevRouteHistory: RouteInfo[] = routeHistory.slice(0, idx);
    // Todo: if idx == -1

    navigate(path, {
      state: {
        prevRouteHistory,
      },
    });
  };

  return (
    <div className={`bread-crumb ${className}-bread-crumb`}>
      <nav className={`bread-crumb-nav ${className}-bread-crumb-nav`}>
        {routeHistory.map((routeInfo: RouteInfo) => {
          const { sigName, path } = routeInfo;
          const isCur: boolean = path === curPath;

          return isCur ? (
            <SubCrumb
              key={path}
              routeInfo={{ sigName: sigName, path: '' }}
              isCur={isCur}
              pathClick={pathClick}
            />
          ) : (
            <React.Fragment key={path}>
              <SubCrumb
                routeInfo={routeInfo}
                isCur={isCur}
                pathClick={pathClick}
              />
              <div
                className={`bread-crumb-nav-deli ${className}-bread-crumb-nav-deli`}
              >
                <RightArrow className="bread-crumb-nav-arrow" />
              </div>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default BreadCrumb;
