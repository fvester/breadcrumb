import { Outlet } from 'react-router-dom';

// For entire layout
const Layout = () => {
  return (
    <div id="layout">
      <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;