import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

  const Linkedin = import.meta.env.VITE_APP_LINKEDIN;
  const Github = import.meta.env.VITE_APP_GITHUB


  return (
    <footer className="bg-light py-4 border-top  fixed-bottom">
      <Container>
        <div className="row">
          <div className="col-md-12 text-muted">
            &copy; 2025 Peekly, <small>Built with 💗 and passion!</small>{' '}
            <a href="/privacy" className="text-muted me-3">
              Privacy
            </a>
            <a href={Github} className="" title='Visit my GitHub profile'>
              <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faGithub} />
            </a>
            <a href={Linkedin} className="text-muted" title='Visit my LinkedIn profile'>
              <FontAwesomeIcon
                style={{ marginRight: '8px' }}
                icon={faLinkedin}
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
