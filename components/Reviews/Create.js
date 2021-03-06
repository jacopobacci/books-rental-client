import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

const Create = ({ bookId, setShowCreateReview }) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [review, setReview] = useState({ rating: "", content: "" });
  const [validated, setValidated] = useState(false);

  const createReview = async (evt) => {
    setValidated(true);
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews/${bookId}`, {
      body: JSON.stringify({
        rating: review.rating,
        content: review.content,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      method: "POST",
    });
    setShowCreateReview(false);
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setReview({ ...review, [evt.target.name]: evt.target.value });
  };

  return (
    <Row className="justify-content-center align-items-center">
      <Col>
        <Form noValidate validated={validated} onSubmit={createReview}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Range value={review.rating} min={1} max={5} onChange={handleChange} name="rating" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter review"
              name="content"
              autoComplete="name"
              value={review.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Create;
