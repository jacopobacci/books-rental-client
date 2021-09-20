import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useState } from "react";

const Update = ({ review, setShowUpdate, setInitReview }) => {
  const auth = useContext(AuthContext);
  const [reviewVal, setReviewVal] = useState({ rating: review.rating, content: review.content });

  const updateReview = async (evt) => {
    evt.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews/${review._id}`, {
        body: JSON.stringify({
          rating: reviewVal.rating,
          content: reviewVal.content,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "PUT",
      });
      setShowUpdate(false);
      setInitReview(reviewVal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (evt) => {
    evt.preventDefault();
    setReviewVal({ ...reviewVal, [evt.target.name]: evt.target.value });
  };

  return (
    <Row className="justify-content-center align-items-center">
      <Col>
        <Form onSubmit={updateReview}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Range value={reviewVal.rating} min={1} max={5} onChange={handleChange} name="rating" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter review"
              name="content"
              autoComplete="name"
              value={reviewVal.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Update;
