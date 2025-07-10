import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const location = useLocation();

  const visitingAuthPage = ["/signin", "/signup"].includes(location.pathname);

  if (typeof token === 'undefined') {
    console.log('⏳ Waiting for token to hydrate...');
    return null; 
  }

  const isAuth = Boolean(token);

  if (isAuth && visitingAuthPage) {
    return <Navigate to={`/${id}`} replace />;
  }

  if (!isAuth && !visitingAuthPage) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
