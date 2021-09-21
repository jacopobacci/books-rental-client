import { Form, Button, Row, Container, Col } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const create = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  const createGenre = async (evt) => {
    evt.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`, {
        body: JSON.stringify({
          name: evt.target.name.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "POST",
      });
      router.push("/genres");
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
            <Form onSubmit={createGenre}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" placeholder="Enter genre name" name="name" autoComplete="name" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Create Genre
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default create;
