import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

  return (
    <footer className="bg-light py-4 border-top  fixed-bottom">
      <Container>
        <div className="row">
          <div className="col-md-12 text-muted">
            &copy; 2025 [BRAND] <small>Built with 💙 and passion!</small>{' '}
            <a href="/privacy" className="text-muted me-3">
              Privacy
            </a>
            <a href={import.meta.env.VITE_APP_GITHUB} className="text-muted" title='Visit my GitHub profile'>
              <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faGithub} />
            </a>
            <a href={import.meta.env.VITE_APP_LINKEDIN} className="text-muted" title='Visit my LinkedIn profile'>
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
