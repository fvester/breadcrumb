import type { RouteInfo } from '@/types/types';
import './BreadCrumb.scss';
import SubCrumb from './SubCrumb';
import { useLocation } from 'react-router-dom';
import React from 'react';

interface BreadCrumbProps {
  route_history: RouteInfo[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ route_history }) => {
  const { pathname: cur_path } = useLocation();

  return (
    <div id="bread-crumb">
      <nav className="bread-crumb-nav">
        {route_history.map((info: RouteInfo) => {
          const { sig_name, path } = info;
          const is_cur: boolean = path === cur_path;

          return is_cur ? (
            <SubCrumb key={path} sig_name={sig_name} path="" />
          ) : (
            <React.Fragment key={path}>
              <SubCrumb sig_name={sig_name} path={path} />
              <div className="bread-crumb-nav-deli"> {'>'} </div>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default BreadCrumb;
