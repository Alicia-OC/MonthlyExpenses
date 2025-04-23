import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLogout } from '../state/authSlice';

const SignOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  try {
    dispatch(setLogout());
    navigate('/SignIn');
  } catch (error) {
    console.log(error);
  }
};

export default SignOut;
