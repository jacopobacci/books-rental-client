import { useContext, useState } from "react";
import { Col, ListGroup, Button } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";

const Rental = ({ rental }) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const [deleted, setDeleted] = useState(false);

  function formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }

  const deleteRental = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals/${rental._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      method: "DELETE",
    });
    setDeleted(true);
  };

  return (
    <>
      <Col lg={4} className={`${deleted && "d-none"} mb-5`}>
        <ListGroup>
          <ListGroup.Item variant="dark">
            Book rented by{" "}
            <span className="fw-bold">
              {rental.customer.user.firstName} {rental.customer.user.lastName}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Title: <span className="fw-bold">{rental.book.title}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Author: <span className="fw-bold">{rental.book.author}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Date out: <span className="fw-bold">{formattedDate(new Date(rental.dateOut))}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Available:{" "}
            <span className="fw-bold">
              {formattedDate(new Date(new Date(rental.dateOut).setMonth(new Date(rental.dateOut).getMonth() + 1)))}
            </span>
          </ListGroup.Item>
          {isLoggedIn && rental.customer.user._id === auth.userId && (
            <ListGroup.Item>
              <Button variant="primary" onClick={deleteRental}>
                Return this book
              </Button>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </>
  );
};

export default Rental;
