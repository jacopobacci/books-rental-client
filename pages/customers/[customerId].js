import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import Footer from "../../components/Footer";

const UpdateCustomer = () => {
  const router = useRouter();
  const { customerId } = router.query;

  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const [customer, setCustomer] = useState({
    street: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    phone: "",
    favouriteGenres: [],
  });

  const [allGenres, setAllGenres] = useState({ genres: [{ _id: "", name: "" }] });

  useEffect(() => {
    const getCustomer = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers/${customerId}`);
      const customerData = await res.json();
      const { street, streetNumber, postalCode, city, phone, favouriteGenres } = customerData.customer;
      let arr = [];
      for (let genre of favouriteGenres) {
        arr.push(genre.name);
      }
      setCustomer({ street, streetNumber, postalCode, city, phone, favouriteGenres: arr });
    };
    getCustomer();
  }, []);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
      const data = await res.json();
      setAllGenres(data);
    };
    getGenres();
  }, []);

  const updateCustomer = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.stopPropagation();
    }
    setValidated(true);

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers/${customerId}`, {
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
      method: "PUT",
    });
    router.push("/customers");
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setCustomer({ ...customer, [evt.target.name]: evt.target.value });
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    customer.favouriteGenres.push(evt.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <Row className="justify-content-center align-items-center mb-5" style={{ padding: "0px 12px" }}>
          <Col xs lg="4" className="bg-white p-3 rounded">
            <Form onSubmit={updateCustomer}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street"
                  name="street"
                  autoComplete="name"
                  onChange={handleChange}
                  value={customer.street}
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
                  value={customer.streetNumber}
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
                  value={customer.postalCode}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  autoComplete="name"
                  onChange={handleChange}
                  value={customer.city}
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
                  value={customer.phone}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Favorite genres</Form.Label>
                <br />
                {allGenres.genres.map((genre) => (
                  <Button key={genre._id} value={genre.name} size="sm" className="me-2 mb-2" onClick={handleClick}>
                    {genre.name}
                  </Button>
                ))}
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Update Customer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateCustomer;
