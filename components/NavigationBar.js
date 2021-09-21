import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import { Button } from "react-bootstrap";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  return (
    <Navbar bg="light" expand="lg" className="mb-5 py-3">
      <Container>
        <Link href="/">
          <Navbar.Brand href="/">Books Rental</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Button variant="danger" onClick={auth.logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Link>
                <Link href="/register">
                  <Nav.Link href="/register">Register</Nav.Link>
                </Link>
              </>
            )}
            <NavDropdown title="Genres" id="basic-nav-dropdown">
              <Link href="/genres">
                <NavDropdown.Item href="/genres">All genres</NavDropdown.Item>
              </Link>
              <Link href="/genres/create">
                <NavDropdown.Item href="/genres/create">Create Genre</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Books" id="basic-nav-dropdown">
              <Link href="/books">
                <NavDropdown.Item href="/books">All Books</NavDropdown.Item>
              </Link>
              <Link href="/books/create">
                <NavDropdown.Item href="/books/create">Create Book</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Customers" id="basic-nav-dropdown">
              <Link href="/customers">
                <NavDropdown.Item href="/books">All Customers</NavDropdown.Item>
              </Link>
              <Link href="/customers/create">
                <NavDropdown.Item href="/books/create">Create Customer</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
