import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/Anya.png';
import { setLogout } from '../../state/authSlice';
import { setCurrency } from '../../state/authSlice';

const Linkedin = import.meta.env.VITE_APP_LINKEDIN;
const backendLink = import.meta.env.VITE_APP_API_URL;

const NavBar = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);

  const defaultDark = window.matchMedia(
    '(prefers-color-scheme: green)'
  ).matches;

  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'pastels-pink' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleTheme = () => {
    onClick(theme);
  };

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
            <NavDropdown
              title="Color palette"
              className="dropdown-menu-color-palette"
            >
              <NavDropdown.Item onClick={(e) => onClick('light')}>
                <span class="palette-dot theme-pastel-pink"></span>
                <span class="">Pastel Pink</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => onClick('green')}>
                <span class="palette-dot theme_green"></span>
                <span class="">Earth</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => onClick('dark')}>
                <span class="palette-dot theme_dark"></span>
                <span class="">Dark</span>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/about" target="_blank" className="header-links">
              About
            </Nav.Link>
            <Nav.Link
              href="https://alicia-oc.github.io/aliciaoc-portfolio/"
              target="_blank"
              className="header-links"
            >
              Portfolio
            </Nav.Link>
            <Nav.Link
              href={Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="header-links"
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
