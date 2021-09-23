import { Row, Col, ListGroup } from "react-bootstrap";

const Rental = ({ rental }) => {
  function formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }

  console.log(rental.book);

  return (
    <Col lg={4}>
      <ListGroup>
        <ListGroup.Item variant="dark">
          Book rented by {rental.customer.user.firstName} {rental.customer.user.lastName}
        </ListGroup.Item>
        <ListGroup.Item>
          Book: {rental.book.title} by {rental.book.author}
        </ListGroup.Item>
        <ListGroup.Item>Date out: {formattedDate(new Date(rental.dateOut))}</ListGroup.Item>
      </ListGroup>
      {/* {isLoggedIn && (
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
        )} */}
    </Col>
  );
};

export default Rental;
