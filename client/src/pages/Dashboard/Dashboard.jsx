import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isTokenExpired from '../../utils/auth';
import { setLogout } from '../../state/authSlice';

import NavBar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './css/index.css';

const DashLayout = () => {
  const token = useSelector((state) => state.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(setLogout());
      navigate('/signin');
    }
  }, [token, dispatch, navigate]);

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
