import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';

// For entire layout
const Layout = () => {
  return (
    <div id="layout">
      <Header />
      <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;
