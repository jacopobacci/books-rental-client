import { Accordion, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Create from "./Create";
import Review from "./Review";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useState } from "react";

const Reviews = ({ book }) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const [showCreateReview, setShowCreateReview] = useState(false);

  return (
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
              ) : !book.reviews.length && isLoggedIn ? (
                <Button
                  variant="primary"
                  type="submit"
                  className="m-2"
                  onClick={() => (!showCreateReview ? setShowCreateReview(true) : setshowCreateReview(false))}
                >
                  Add review
                </Button>
              ) : (
                <span className="px-3">No reviews yet, login to add a review.</span>
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
  );
};

export default Reviews;
