import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";
import Link from "next/link";

const create = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
      setGenresData(await res.json());
    };
    fetchData();
  }, []);

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

  const [customer, setCustomer] = useState({
    street: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    phone: "",
    favouriteGenres: [],
  });

  const createCustomer = async (evt) => {
    setValidated(true);
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`, {
      body: JSON.stringify({
        street: customer.street,
        streetNumber: customer.streetNumber,
        postalCode: customer.postalCode,
        city: customer.city,
        phone: customer.phone,
        favouriteGenres: customer.favouriteGenres,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      method: "POST",
    });
    router.push("/books");
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setCustomer({ ...customer, [evt.target.name]: evt.target.value });
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    customer.favouriteGenres.push(evt.target.value);
    evt.target.setAttribute("disabled", true);
  };

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Create new customer</h1>
        <Row className="justify-content-center align-items-center mb-5" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form noValidate validated={validated} onSubmit={createCustomer}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street"
                  name="street"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Street number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter street number"
                  name="streetNumber"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Postal code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postal code"
                  name="postalCode"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Min 4 digits</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Min 5 digits</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Favorite genres</Form.Label>
                <br />
                {genresData.genres ? (
                  genresData.genres.map((genre) => (
                    <Button
                      key={genre._id}
                      value={genre.name}
                      size="sm"
                      variant="dark"
                      className="me-2 mb-2"
                      onClick={handleClick}
                    >
                      {genre.name}
                    </Button>
                  ))
                ) : (
                  <Link href="/genres/create">Create a genre</Link>
                )}
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
