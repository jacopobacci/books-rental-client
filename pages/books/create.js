import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";
import Link from "next/link";

const create = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [genresData, setGenresData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(AuthContext);

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
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
      setGenresData(await res.json());
      setIsLoading(false);
    };
    fetchData();
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
        createBook(reader.result);
      };
      reader.onerror = () => {
        console.error("Error");
      };
      const createBook = async (base64EncodedImage) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`, {
          body: JSON.stringify({
            title: evt.target.title.value,
            author: evt.target.author.value,
            imageUpload: base64EncodedImage,
            genre: evt.target.genre.value,
            description: evt.target.description.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          method: "POST",
        });
        const result = await res.json();
        if (result) return router.push("/books");
      };
    } else {
      const createBook = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`, {
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
        const result = await res.json();
        if (result) return router.push("/books");
      };
      createBook();
    }
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
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Col xs lg="4" className="bg-white p-3 rounded">
              <Form noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" name="title" autoComplete="name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" placeholder="Enter author name" name="author" autoComplete="name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Choose an image from the web</Form.Label>
                  <Form.Control type="text" placeholder="Enter image url" name="image" autoComplete="name" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3" controlId="imageUpload">
                  <Form.Label>Or upload your own</Form.Label>
                  <Form.Control type="file" name="imageUpload" autoComplete="name" onChange={handleFileInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="genre">
                  <Form.Label>Genre</Form.Label>
                  {genresData.genres ? (
                    <Form.Select aria-label="Select genre" name="genre" required>
                      <option>Select a genre...</option>
                      {genresData.genres.map((genre) => (
                        <option key={genre._id} value={genre.name}>
                          {genre.name}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p>
                      <Link href="/genres/create">Create a genre</Link>
                    </p>
                  )}
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
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default create;
