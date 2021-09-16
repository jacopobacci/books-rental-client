import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";

const NavigationBar = () => {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="#home">Books Rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">
              <a>Home</a>
            </Link>
            {auth.isLoggedIn ? (
              <button onClick={auth.logout}>Logout</button>
            ) : (
              <>
                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </>
            )}
            <NavDropdown title="Genres" id="basic-nav-dropdown">
              <NavDropdown.Item href="/genres">All genres</NavDropdown.Item>
              <NavDropdown.Item href="/genres/create">Create Genre</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
