import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../UserContext';

import { useContext } from 'react';

import { Link, NavLink } from 'react-router-dom'

import '../index.css';

export default function NavbarApp() {

  const {user} = useContext(UserContext);

  return (
    <Navbar expand="lg" className="navbar-transparent fixed-top p-3" id="nav">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">CineAtlas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex d-grid gap-5">
            <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            {(user.id !== null) 
                        
              ? 
                <>
                  <Nav.Link as={NavLink} to="/movies" exact="true" className="fw-semibold">Movies</Nav.Link>
                  <Nav.Link as={Link} to="/logout" className="fw-semibold">Logout</Nav.Link>
                </>
              : 
                <>
                  <Nav.Link as={Link} to="/login" className="fw-semibold">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="fw-semibold">Sign Up</Nav.Link>
                </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
