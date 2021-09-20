import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useState } from "react";

const Update = ({ genre, setShowUpdate, setGenreName }) => {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState(genre.name);

  const updateGenre = async (evt) => {
    evt.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres/${genre._id}`, {
        body: JSON.stringify({
          name: evt.target.name.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "PUT",
      });
      setShowUpdate(false);
      setGenreName(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setValue(evt.target.value);
  };
  return (
    <Row className="justify-content-center align-items-center">
      <Col>
        <Form onSubmit={updateGenre}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre name"
              name="name"
              autoComplete="name"
              value={value}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-3">
            Update Genre
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Update;
