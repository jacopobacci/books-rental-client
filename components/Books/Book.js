import Head from "next/head";
import { Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Reviews from "../Reviews/Reviews";
import BookButtons from "./BookButtons";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useState } from "react";

const Book = ({ book }) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const [showBook, setShowBook] = useState(true);
  const [bookAvailable, setBookAvailable] = useState(book.isAvailable);
  const [dateOut, setDateOut] = useState("");

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
              Available {bookAvailable ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}
              {dateOut && <span className="ps-3">Date out: {dateOut}</span>}
            </ListGroupItem>
          </ListGroup>
          <Reviews book={book} />
          {isLoggedIn && (
            <BookButtons book={book} setShowBook={setShowBook} setBookAvailable={setBookAvailable} setDateOut={setDateOut} />
          )}
        </Card>
      </Col>
    </>
  );
};

export default Book;
