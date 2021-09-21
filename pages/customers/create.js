import { Form, Button, Row, Container, Col } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Book from "../../components/Books/Book";

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
  const [customer, setCustomer] = useState({
    street: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    phone: "",
    favouriteGenres: [],
  });

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, []);

  const createCustomer = async (evt) => {
    evt.preventDefault();

    try {
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
      router.push("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setCustomer({ ...customer, [evt.target.name]: evt.target.value });
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    customer.favouriteGenres.push(evt.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs lg="4">
            <Form onSubmit={createCustomer}>
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
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Favorite genres</Form.Label>
                {genresData.genres.map((genre) => (
                  <Button key={genre._id} value={genre.name} onClick={handleClick}>
                    {genre.name}
                  </Button>
                ))}
              </Form.Group>
              <Button variant="primary" type="submit" className="me-3">
                Create Customer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default create;
