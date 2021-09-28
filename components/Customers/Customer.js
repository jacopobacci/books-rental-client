import Link from "next/link";
import { useContext, useState } from "react";
import { Button, ButtonGroup, Col, ListGroup, Row } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import DeleteCustomer from "./DeleteCustomer";

const Customer = ({ customer }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCustomer, setShowCustomer] = useState(true);
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  return (
    <Col lg={4} className={`${!showCustomer && "d-none"} mb-5`}>
      <ListGroup>
        <ListGroup.Item variant="dark">
          Customer{" "}
          <span className="fw-bold">
            {customer.user.firstName} {customer.user.lastName}
          </span>
        </ListGroup.Item>
        <ListGroup.Item>
          City: <span className="fw-bold">{customer.city}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          Street: <span className="fw-bold">{customer.street}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          Street Number: <span className="fw-bold">{customer.streetNumber}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          Postal Code: <span className="fw-bold">{customer.postalCode}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          Phone: <span className="fw-bold">{customer.phone}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>Favourite genres:</p>
          <ul>
            {customer.favouriteGenres.map((genre) => (
              <li key={genre.name}>{genre.name}</li>
            ))}
          </ul>
        </ListGroup.Item>

        {isLoggedIn && customer.user._id === auth.userId && (
          <ListGroup.Item>
            <ButtonGroup aria-label="Update and delete">
              <Link
                href={{
                  pathname: "/customers/[customerId]",
                  query: { customerId: customer._id },
                }}
              >
                <Button variant="primary">Update</Button>
              </Link>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                Delete
              </Button>
            </ButtonGroup>
            {showDeleteModal && (
              <DeleteCustomer setShowDeleteModal={setShowDeleteModal} customer={customer} setShowCustomer={setShowCustomer} />
            )}
          </ListGroup.Item>
        )}
      </ListGroup>
    </Col>
  );
};

export default Customer;
