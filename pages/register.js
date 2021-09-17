import NavigationBar from "../components/NavigationBar";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../shared/context/auth-context";

const register = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const registerUser = async (evt) => {
    evt.preventDefault();

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs lg="4">
            <Form onSubmit={registerUser}>
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
    </div>
  );
};

export default register;
