import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { AuthContext } from "../shared/context/auth-context";
import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import jwt from "jsonwebtoken";
import Image from "next/image";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const [myName, setMyName] = useState("");

  useEffect(() => {
    if (auth.token) {
      const json = jwt.decode(auth.token);
      const { firstName } = json;
      setMyName(`Hi ${firstName}!`);
    } else {
      setMyName("");
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="mb-5 py-3 text-center">
      <Container>
        <Image src="/books-rental.png" width={50} height={50} alt="Books Rental Logo" />
        <Link href="/">
          <Navbar.Brand href="/" className="ps-2">
            Books Rental
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Books" id="basic-nav-dropdown" className="px-4">
              <Link href="/books">
                <NavDropdown.Item href="/books">All Books</NavDropdown.Item>
              </Link>
              <Link href="/books/create">
                <NavDropdown.Item href="/books/create">Create Book</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Genres" id="basic-nav-dropdown" className="px-4">
              <Link href="/genres">
                <NavDropdown.Item href="/genres">All genres</NavDropdown.Item>
              </Link>
              <Link href="/genres/create">
                <NavDropdown.Item href="/genres/create">Create Genre</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Customers" id="basic-nav-dropdown" className="px-4">
              <Link href="/customers">
                <NavDropdown.Item href="/books">All Customers</NavDropdown.Item>
              </Link>
              <Link href="/customers/create">
                <NavDropdown.Item href="/books/create">Create Customer</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Link href="/rentals">
              <Nav.Link href="/rentals" className="px-4">
                Rentals
              </Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Link href="/me">
                  <Nav.Link href="/me" className="me-lg-2">
                    {myName}
                  </Nav.Link>
                </Link>
                <Button variant="danger" className="float-end" onClick={auth.logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="float-end">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Link>
                <Link href="/register" className="float-end">
                  <Nav.Link href="/register">Register</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
