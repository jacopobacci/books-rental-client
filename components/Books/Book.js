import { Card, Col, ListGroup, ListGroupItem, Accordion, ButtonGroup, Button } from "react-bootstrap";
import Review from "../Reviews/Review";
import Head from "next/head";
import Delete from "./Delete";
import { useState } from "react";
import Link from "next/link";
import Create from "../Reviews/Create";

const Book = ({ book }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBook, setShowBook] = useState(true);
  const [showCreateReview, setShowCreateReview] = useState(false);

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
          <Card.Img variant="top" src={book.image} style={{ height: "60vh", objectFit: "contain" }} className="p-3" />
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
          <Accordion defaultActiveKey="0" className="m-3">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Reviews</Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="px-0">
                    {book.reviews.length ? (
                      <>
                        {book.reviews.map((review) => (
                          <Review key={review._id} review={review} />
                        ))}
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        className="m-2"
                        onClick={() => (!showCreateReview ? setShowCreateReview(true) : setShowCreateReview(false))}
                      >
                        Add review
                      </Button>
                    )}
                    {showCreateReview && (
                      <div className="p-4">
                        <Create bookId={book._id} setShowCreateReview={setShowCreateReview} />
                      </div>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="mx-3">
            <div className="d-grid gap-2">
              <Button variant="success">Rent</Button>
            </div>
          </div>

          <ButtonGroup aria-label="Update and delete" className="m-3">
            <Link
              href={{
                pathname: "/books/[bookId]",
                query: { bookId: book._id },
              }}
            >
              <Button variant="primary">Update</Button>
            </Link>
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
