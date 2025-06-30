import { Outlet } from 'react-router-dom';

import NavBar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import "./css/index.css"

const DashLayout = () => {
  return (
    <div className="DashLayoutWrapper">
      <NavBar />
      <div className="DashContainer">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};


export default DashLayout;
