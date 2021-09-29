import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";

const create = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

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
  const [validated, setValidated] = useState(false);

  const createGenre = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    }
    setValidated(true);

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
  };

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Create new genre</h1>
        <Row className="justify-content-center align-items-center" style={{ padding: "0px 12px" }}>
          <Col lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={createGenre}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" placeholder="Enter genre name" name="name" autoComplete="name" required />
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
