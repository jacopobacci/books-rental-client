import { Button, Form, ButtonGroup } from "react-bootstrap";
import Update from "./Update";
import { useState } from "react";

const Review = ({ review }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [initReview, setInitReview] = useState({ rating: review.rating, content: review.content });

  function formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="border rounded p-2 m-2">
      <Form.Label>Rating</Form.Label>
      <Form.Range disabled={true} value={initReview.rating} min={1} max={5} />
      <p className="py-2">{initReview.content}</p>
      <p>
        Created at <span className="fw-bold">{formattedDate(new Date(review.createdAt))}</span>
      </p>
      <p>
        By{" "}
        <span className="fw-bold">
          {review.user.firstName} {review.user.lastName}
        </span>
      </p>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" onClick={() => (!showUpdate ? setShowUpdate(true) : setShowUpdate(false))}>
          Update
        </Button>
        <Button variant="danger">Delete</Button>
      </ButtonGroup>
      {showUpdate && <Update review={review} setShowUpdate={setShowUpdate} setInitReview={setInitReview} />}
    </div>
  );
};

export default Review;
