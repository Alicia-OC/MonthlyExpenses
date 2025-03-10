import { Outlet } from 'react-router-dom';

import NavBar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const DashLayout = (props) => {
  return (
    <>
      <NavBar />
      <div className="DashContainer">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
