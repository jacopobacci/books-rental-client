import React from "react";
import { ProgressBar, Row, Col, Form } from "react-bootstrap";

const Review = ({ review }) => {
  function formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      <Form.Label>Rating</Form.Label>
      <Form.Range disabled={true} value={review.rating} min={1} max={5} />
      <p className="py-3">{review.content}</p>
      <p>
        Created at <span className="fw-bold">{formattedDate(new Date(review.createdAt))}</span>
      </p>
      <p>
        By{" "}
        <span className="fw-bold">
          {review.user.firstName} {review.user.lastName}
        </span>
      </p>
    </>
  );
};

export default Review;
