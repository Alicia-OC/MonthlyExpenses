import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import avatar from '../../assets/Anya.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { setCurrency } from '../../state/authSlice';

import { useDispatch } from 'react-redux';

const Linkedin = import.meta.env.VITE_APP_LINKEDIN;

const NavBar = () => {
  const dispatch = useDispatch();


  const updateCurrency = async (newCurrency) => {
    dispatch(setCurrency({ currency: newCurrency }));
  };

  return (
    <Navbar expand="lg" bg="light" fixed="top" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="navbar-element">
          <Nav className="ms-auto  align-items-center">
            <Nav.Link href="/about" className="navbar-element">
              About
            </Nav.Link>
            <Nav.Link href={Linkedin} className="navbar-element">
              LinkedIn
            </Nav.Link>
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
              <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/user/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="/SignOut">Logout</NavDropdown.Item>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
