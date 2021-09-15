import { Form, Button, Row, Container, Col } from "react-bootstrap";
import Link from "next/link";
import NavigationBar from "../components/NavigationBar";
import jwt from "jsonwebtoken";
import { useState } from "react";

const login = () => {
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);

  const loginUser = async (evt) => {
    evt.preventDefault();

    const res = await fetch(`http://localhost:3001/api/auth`, {
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
    const { token } = result;

    if (token) {
      const json = jwt.decode(token);
      const { firstName, lastName, userId } = json;
      setMessage(`Welcome ${firstName} ${lastName}`);
    } else {
      setMessage("Something went wrong");
    }
    console.log(result);
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>{message}</h1>
        <Row className="justify-content-center align-items-center">
          <Col xs lg="4">
            <Form onSubmit={loginUser}>
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
              <Link href="/signup">
                <a>Or signup</a>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default login;
