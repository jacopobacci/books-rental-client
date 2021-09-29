import { Form, Button, Row, Container, Col } from "react-bootstrap";
import Link from "next/link";
import NavigationBar from "../components/NavigationBar";
import jwt from "jsonwebtoken";
import { AuthContext } from "../shared/context/auth-context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const login = ({ data }) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [uId, setUId] = useState("");

  const loginUser = async (evt) => {
    evt.preventDefault();

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
    setUId(userId);
    return router.push("/books");
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1 className="mb-5 text-center">Login</h1>
        <Row className="justify-content-center align-items-center" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
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
              <Link href="/register">
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
