import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './css/index.css';

const DashLayout = () => {
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);

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
