import { Form, Button, Row, Container, Col, InputGroup, FormControl } from "react-bootstrap";
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

  const createBook = async (evt) => {
    evt.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`, {
        body: JSON.stringify({
          title: evt.target.title.value,
          author: evt.target.author.value,
          image: evt.target.image.value,
          genre: evt.target.genre.value,
          description: evt.target.description.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "POST",
      });
      router.push("/books");
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
            <Form onSubmit={createBook}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author name" name="author" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Enter image url" name="image" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="genre">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" placeholder="Enter genre name" name="genre" autoComplete="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" placeholder="Enter description" rows={3} />
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
