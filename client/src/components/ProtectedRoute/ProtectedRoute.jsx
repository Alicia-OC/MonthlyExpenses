import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const location = useLocation();
  const isAuth = Boolean(token);

  const visitingAuthPage = ['/signin', '/signup'].includes(location.pathname);

  if (typeof token === 'undefined') {
    console.log('Waiting for token to hydrate...');
    return null;
  }

  //user logged trying to access signin or signup are riderected to their profiles
  if (isAuth && visitingAuthPage) {
    return <Navigate to={`/profile/${userId}`} replace />;
  }

  //user not logged are redirected to /landing
  if (!isAuth && !visitingAuthPage) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute;
