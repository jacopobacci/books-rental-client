import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import Footer from "../../components/Footer";

const Update = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const { bookId } = router.query;
  const [book, setBook] = useState({ title: "", author: "", image: "", genre: "", description: "" });
  const [allGenres, setAllGenres] = useState({ genres: [{ _id: "", name: "" }] });

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${bookId}`);
      const bookData = await res.json();
      const { title, author, image, genre, description } = bookData.book;
      setBook({ title, author, image, genre: genre.name, description });
    };
    getBook();
  }, []);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
      const genres = await res.json();
      setAllGenres(genres);
    };
    getGenres();
  }, []);

  const updateBook = async (evt) => {
    evt.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${bookId}`, {
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          image: book.image,
          genre: book.genre,
          description: book.description,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "PUT",
      });
      router.push("/books");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setBook({ ...book, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs lg="4">
            <Form onSubmit={updateBook}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  autoComplete="name"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  name="author"
                  autoComplete="name"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  name="image"
                  autoComplete="name"
                  value={book.image}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="genre">
                <Form.Label>Genre</Form.Label>
                <Form.Select aria-label="Select genre" name="genre" value={book.genre} onChange={handleChange} required>
                  <option>Select a genre...</option>
                  {allGenres.genres.map((genre) => (
                    <option key={genre._id}>{genre.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  rows={3}
                  value={book.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Update Book
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Update;
