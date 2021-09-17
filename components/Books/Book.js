import { Card, Col, ListGroup, ListGroupItem, Accordion, ButtonGroup, Button } from "react-bootstrap";
import Review from "../Reviews/Review";
import Head from "next/head";
import Delete from "./Delete";
import { useState } from "react";

const Book = ({ book }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBook, setShowBook] = useState(true);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Col lg={4} className={`${!showBook && "d-none"}`}>
        <Card className="mb-5">
          <Card.Img variant="top" src={book.image} />
          <Card.Body>
            <Card.Title>
              {book.title} by {book.author}
            </Card.Title>
            <Card.Text>{book.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              Genre <span className="fw-bold">{book.genre.name}</span>
            </ListGroupItem>
            <ListGroupItem>
              Available {book.isAvailable ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}
            </ListGroupItem>
          </ListGroup>
          <Accordion defaultActiveKey="0" className="m-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Reviews</Accordion.Header>
              <Accordion.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="px-0">
                    {book.reviews.length ? (
                      <>
                        {book.reviews.map((review) => (
                          <Review key={review._id} review={review} />
                        ))}
                      </>
                    ) : (
                      <span>No reviews yet.</span>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ButtonGroup aria-label="Update and delete" className="m-3">
            <Button variant="primary">Update</Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete
            </Button>
            {showDeleteModal && <Delete setShowDeleteModal={setShowDeleteModal} book={book} setShowBook={setShowBook} />}
          </ButtonGroup>
        </Card>
      </Col>
    </>
  );
};

export default Book;
