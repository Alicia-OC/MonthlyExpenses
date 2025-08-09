import { useNavigate } from 'react-router-dom';
import './landing.css';
 

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container landig-container">
        {' '}
        <div className=" landing-page">
          <h1>Quick Peek, Smart Spend! </h1>
          <h2>Landing (Public: anyone can access this page)</h2>
          <h3>
            The cutest way to manage your monthly expenses and reach your
            financial dreams
          </h3>
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
