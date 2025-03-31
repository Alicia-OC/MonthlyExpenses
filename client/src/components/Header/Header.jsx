import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavBar = () => {
  const username = 'Account' || 'das';
  const image = '' || '';
  return (
    <Navbar expand="lg" bg="light" fixed="top" className="px-3">
      <Container fluid>
        <Navbar.Brand href="#">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">LinkedIn</Nav.Link>
            <NavDropdown title={username} id="accountDropdown">
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavBar;
