import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import './Layout.scss';
import Footer from './components/common/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For entire layout
const Layout = () => {
  return (
    <>
      <ToastContainer />
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
