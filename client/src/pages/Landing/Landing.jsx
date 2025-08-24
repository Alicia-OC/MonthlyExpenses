import { useNavigate } from 'react-router-dom';
import './landing.css';
import Image from 'react-bootstrap/Image';

import dream from '../../assets/dreams.png';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="landingPage">
        {' '}
        <div className="landing-page">
          <h1>Peekly </h1>
          <h3>
            the cutest way to manage your monthly expenses <br /> and reach your
            financial <img src={dream} alt="dreams" width="100" />
          </h3>
          <h4>Quick Peek, Smart Spend!</h4>
       
          <button
            onClick={() => navigate('/signin', { replace: true })}
            className="btn btn-dark"
            type="submit"
          >
            Sign in
          </button>{' '}
          <button
            onClick={() => navigate('/signup', { replace: true })}
            className="btn btn-dark"
            type="submit"
          >
            Sign up, join us!
          </button>{' '}
        </div>
      </div>
    </>
  );
};

export default Landing;
