import { Card, Col, ListGroup, ListGroupItem, Accordion } from "react-bootstrap";
import Review from "../Reviews/Review";
import Head from "next/head";

const Book = ({ book }) => {
  console.log(book);
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
      <Col className="mb-5">
        <Card style={{ width: "18rem" }}>
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
              Available {book.isAvailable ? <i class="fas fa-check-circle"></i> : <i class="fas fa-times-circle"></i>}
            </ListGroupItem>
          </ListGroup>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Reviews</Accordion.Header>
              <Accordion.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
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
        </Card>
      </Col>
    </>
  );
};

export default Book;
