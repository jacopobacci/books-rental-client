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
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (evt) => {
    setValidated(true);
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
      return;
    }
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        updateBook(reader.result);
      };
      reader.onerror = () => {
        console.error("Error");
      };
      const updateBook = async (base64EncodedImage) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${bookId}`, {
          body: JSON.stringify({
            title: book.title,
            author: book.author,
            imageUpload: base64EncodedImage,
            genre: book.genre,
            description: book.description,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          method: "PUT",
        });
        const result = await res.json();
        if (result) return router.push("/books");
        router.push("/books");
      };
    } else {
      const updateBook = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${bookId}`, {
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
        const result = await res.json();
        if (result) return router.push("/books");
        router.push("/books");
      };
      updateBook();
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setBook({ ...book, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <Row className="justify-content-center align-items-center mb-5" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3" controlId="imageUpload">
                <Form.Label>Or upload your own</Form.Label>
                <Form.Control type="file" name="imageUpload" autoComplete="name" onChange={handleFileInputChange} />
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
