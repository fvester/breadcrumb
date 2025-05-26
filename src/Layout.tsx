import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import './Layout.scss';
import Footer from './components/common/Footer';
import ScrollToTop from './components/ScrollToTop';

// For entire layout
const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="layout">
        <Header />
        <Outlet /> {/* Render child routes */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
