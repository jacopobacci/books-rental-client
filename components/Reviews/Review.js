import React from "react";
import { ProgressBar, Row, Col } from "react-bootstrap";

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
      <ProgressBar now={review.rating} min={1} max={5} label={`Rating`} />
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
