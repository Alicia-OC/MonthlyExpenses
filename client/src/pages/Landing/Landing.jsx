import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-page">
        {' '}
        <h2>
          Landing (Public: anyone can access this page) 
        </h2>
        <p>Cute UI coming soon!</p>
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
    </>
  );
};

export default Landing;
