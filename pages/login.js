import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { AuthContext } from "../shared/context/auth-context";

const login = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [validated, setValidated] = useState(false);

  const loginUser = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    }
    setValidated(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`, {
      body: JSON.stringify({
        email: evt.target.email.value,
        password: evt.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    const { token, userId } = result;
    auth.login(userId, token);
    return router.push("/books");
  };

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Login</h1>
        <Row className="justify-content-center align-items-center" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={loginUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" autoComplete="name" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Login
              </Button>
              <Link href="/register">
                <a>Or signup</a>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default login;
