import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/Anya.png';
import { setLogout } from '../../state/authSlice';
import { setCurrency } from '../../state/authSlice';

const Linkedin = import.meta.env.VITE_APP_LINKEDIN;

const NavBar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);

  const updateCurrency = async (newCurrency) => {
    dispatch(setCurrency({ currency: newCurrency }));
  };

  const HandleLogout = () => {
    try {
      dispatch(setLogout());
      window.location.href = '/signin';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" bg="light" fixed="top" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/home">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="navbar-element">
          <Nav className="ms-auto  align-items-center">
            <Nav.Link href="/about" target="_blank">
              About
            </Nav.Link>
            <Nav.Link href="https://alicia-oc.github.io/aliciaoc-portfolio/" target="_blank">
              Portfolio
            </Nav.Link>
            <Nav.Link
              href={Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-element"
            >
              LinkedIn
            </Nav.Link>

            {isAuth && (
              <>
                <NavDropdown
                  title={
                    <Image
                      src={avatar}
                      roundedCircle
                      className="avatar-img"
                      alt="avatar-img"
                    />
                  }
                  id="accountDropdown"
                >
                  <NavDropdown.Item href={`/profile/${userId}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`/${userId}/cards`}>
                    Library
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`/${userId}/settings`}>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={HandleLogout} href="#">
                    Logout
                  </NavDropdown.Item>{' '}
                </NavDropdown>

                <NavDropdown title="Currency">
                  <NavDropdown.Item onClick={(e) => updateCurrency('$')}>
                    USD $
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => updateCurrency('€')}>
                    EUR €
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => updateCurrency('£')}>
                    GBP £
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
