import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
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
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      const isLoggedIn = storedData && storedData.token;
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setLoaded(true);
      }
    }
  }, []);

  const auth = useContext(AuthContext);

  const createBook = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    }
    setValidated(true);

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
  };

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Create new book</h1>
        <Row className="justify-content-center align-items-center mb-5" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={createBook}>
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
                <Form.Select aria-label="Select genre" name="genre" required>
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
                <Form.Control as="textarea" name="description" placeholder="Enter description" rows={3} required />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default create;
