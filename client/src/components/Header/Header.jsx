import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import Axios from 'axios';
import { useState } from 'react';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/Anya.png';
import { setLogout } from '../../state/authSlice';
import { setCurrency } from '../../state/authSlice';

const Linkedin = import.meta.env.VITE_APP_LINKEDIN;
const backendLink = import.meta.env.VITE_APP_API_URL;

const NavBar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);

  const updateCurrency = async (newCurrency) => {
    dispatch(setCurrency({ currency: newCurrency }));

    setIsLoading(true);

    try {
      const res = await Axios.patch(
        `${backendLink}/users/update/${userId}`,
        { currency: newCurrency },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error fetching default items:', error);
    } finally {
      setIsLoading(false);
    }
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
    <Navbar expand="lg" fixed="top" className="navbar-div px-3">
      <Container fluid>
        <Navbar.Brand href="/home">
          <h1>Peekly</h1>{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="navbar-element">
          <Nav className="ms-auto align-items-center">
            <NavDropdown title="Color palette" className="dropdown-menu-navbar">
              <NavDropdown.Item onClick={(e) => updateCurrency('$')}>
                <span class="palette-dot theme_pink_1"></span>
                <span class="palette-dot theme_pink_2"></span>
                <span class="palette-dot theme_pink_3"></span>
                <span class="palette-dot theme_pink_4"></span>
                <span class="palette-dot theme_pink_5"></span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => updateCurrency('€')}>
                <span class="palette-dot theme_green_1"></span>
                <span class="palette-dot theme_green_2"></span>
                <span class="palette-dot theme_green_3"></span>
                <span class="palette-dot theme_green_4"></span>
                <span class="palette-dot theme_green_5"></span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => updateCurrency('£')}>
                <span class="palette-dot theme_dark_1"></span>
                <span class="palette-dot theme_dark_2"></span>
                <span class="palette-dot theme_dark_3"></span>
                <span class="palette-dot theme_dark_4"></span>
                <span class="palette-dot theme_dark_5"></span>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/about" target="_blank">
              About
            </Nav.Link>
            <Nav.Link
              href="https://alicia-oc.github.io/aliciaoc-portfolio/"
              target="_blank"
            >
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
