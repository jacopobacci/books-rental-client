import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
  const genresData = await res.json();

  return {
    props: { genresData },
  };
}

const create = ({ genresData }) => {
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
        <h1 className="mb-5 text-center">Create new book</h1>
        <Row className="justify-content-center align-items-center mb-5">
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
                <Form.Select aria-label="Select genre" name="genre">
                  <option>Select a genre...</option>
                  {genresData.genres.map((genre) => (
                    <option key={genre._id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" placeholder="Enter description" rows={3} />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default create;
