import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import './Layout.scss';
import Footer from './components/common/Footer';

// For entire layout
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet /> {/* Render child routes */}
      <Footer />
    </div>
  );
};

export default Layout;
