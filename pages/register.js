import NavigationBar from "../components/NavigationBar";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../shared/context/auth-context";
import Footer from "../components/Footer";

const register = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [validated, setValidated] = useState(false);

  const registerUser = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    }
    setValidated(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
      body: JSON.stringify({
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        email: evt.target.email.value,
        password: evt.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    const { userId, token } = result;
    auth.login(userId, token);
    router.push("/");
  };

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Register</h1>
        <Row className="justify-content-center align-items-center" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={registerUser}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="assword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" autoComplete="name" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default register;
