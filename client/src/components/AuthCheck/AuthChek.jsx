import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../state/authSlice';

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.log('AuthCheck: no token in Redux');

      if (import.meta.env.MODE === 'development') {
        console.log(' Dev mode: Setting mocked token');
        dispatch(
          setLogin({
            token: 'mocked-jwt-token',
            user: { name: 'Alicia Dev', email: 'dev@example.com' },
            id: 'dev-user-id',
            avatar: '/assets/Anya.png',
          })
        );
      }
    }
  }, [token, dispatch]);

  return children;
};

export default AuthCheck;
