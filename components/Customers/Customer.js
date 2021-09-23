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
    <Row className={`${!showCustomer && "d-none"} justify-content-center`}>
      <Col lg={2}>
        <ListGroup>
          <ListGroup.Item variant="dark">
            {customer.user.firstName} {customer.user.lastName}
          </ListGroup.Item>
          <ListGroup.Item>{customer.city}</ListGroup.Item>
          <ListGroup.Item>{customer.street}</ListGroup.Item>
          <ListGroup.Item>{customer.streetNumber}</ListGroup.Item>
          <ListGroup.Item>{customer.postalCode}</ListGroup.Item>
          <ListGroup.Item>{customer.phone}</ListGroup.Item>
          <ListGroup.Item>
            <ul>
              {customer.favouriteGenres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
          </ListGroup.Item>
        </ListGroup>
        {isLoggedIn && (
          <>
            <ButtonGroup aria-label="Update and delete" className="m-3">
              <Link
                href={{
                  pathname: "/customers/[customerId]",
                  query: { customerId: customer._id },
                }}
              >
                <Button variant="primary">Update</Button>
              </Link>
            </ButtonGroup>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete
            </Button>
            {showDeleteModal && (
              <DeleteCustomer setShowDeleteModal={setShowDeleteModal} customer={customer} setShowCustomer={setShowCustomer} />
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default Customer;
