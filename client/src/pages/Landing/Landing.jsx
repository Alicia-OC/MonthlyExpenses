import { useNavigate } from 'react-router-dom';
import './landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import avatar from '../../assets/IMG_0200.png';
import screenshot from '../../assets/screenshot.png';

const Landing = () => {
  const navigate = useNavigate();

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
          <div className="title-div" data-aos="fade-up" data-aos-delay="400">
            <h1>Peekly </h1>
          </div>

          <div className="intro-div" data-aos="fade-up" data-aos-delay="400">
            <p>
              the cutest way to manage your monthly expenses <br /> and reach
              your financial{' '}
              <p className="dreams-word-animation">
                <span>d</span>
                <span>r</span>
                <span>e</span>
                <span>a</span>
                <span>m</span>
                <span>s</span>
              </p>
            </p>
          </div>
          <div className="row middle-div">
            <div className="col-lg-4 middle-div-left">
              {' '}
              <img
                data-aos="fade-right"
                data-aos-delay="400"
                className="landing-screenshot-img"
                src={screenshot}
                alt="dreams"
                width="500"
              />
            </div>
            <div className=" col-lg-4 middle-div-right">
              {' '}
              <img
                data-aos="fade-left"
                data-aos-delay="400"
                className="landing-avatar-img"
                src={avatar}
                alt="dreams"
                width="400"
              />
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

          <div className="footer-div"> footer</div>
        </div>
      </div>
    </>
  );
};

export default Landing;
