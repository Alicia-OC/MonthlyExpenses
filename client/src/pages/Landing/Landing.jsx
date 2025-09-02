import { useNavigate } from 'react-router-dom';
import './landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Landing = () => {
  const navigate = useNavigate();
  const Linkedin = import.meta.env.VITE_APP_LINKEDIN;
  const Github = import.meta.env.VITE_APP_GITHUB
  
  useEffect(() => {
    AOS.init({
      duration: 1000, // optional settings like animation duration
      once: true, // only animate once while scrolling down
    });
  }, []);

  return (
    <>
      <div className="landingPage">
        <div className="landing-page">
          <div className="auth-buttons">
            <button onClick={(e) => navigate('/signin')}>Sign in</button>{' '}
            <button onClick={(e) => navigate('/signup')}>
              Create account{' '}
            </button>
          </div>
          <div className="intro-div" data-aos="fade-up" data-aos-delay="400">
            <h2>
              Not another complicated finance app.
              <span className="title-highlight">Peekly</span>makes expense
              tracking effortless: fast when you need it,
              <span className="flexible-word">flexible</span>
              when you want it. <br></br>
              <br></br>
              Minimal effort. Maximum control.
            </h2>
          </div>
          <div className="icon-socials">
            {' '}
            <a href={Github} className="" title="Visit my GitHub profile">
              <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faGithub} />
            </a>
            <a href={Linkedin} className="" title="Visit my LinkedIn profile">
              <FontAwesomeIcon
                style={{ marginRight: '8px' }}
                icon={faLinkedin}
              />
            </a>
          </div>
          <div className="row middle-div">
            <div className="col-lg-4 middle-div-left"></div>
            <div className=" col-lg-4 middle-div-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
